import { defineStore } from 'pinia'

export const useReactionsStore = defineStore('reactions', {
  state: () => ({
    reactions: {} as Record<string, { like: number }>,
    ipReactions: {} as Record<string, Record<string, { count: number, lastLiked: number }>>,
  }),
  actions: {
    async fetchReactions(contentId: string) {
      // Ambil data dari local storage terlebih dahulu
      const localReactions = localStorage.getItem(`reactions_${contentId}`)
      if (localReactions) {
        this.reactions[contentId] = JSON.parse(localReactions)
      }
      else {
        // Jika tidak ada data di local storage, ambil dari Supabase
        const { data, error } = await useFetch(`/api/reactions/${contentId}`)

        if (error) {
          console.error('Error fetching reactions:', error)
          return
        }
        this.reactions[contentId] = data.value as { like: number }
        // this.reactions[contentId] = data.value
      }
    },

    async addReaction(contentId: string, reactionType: 'like') {
      const toast = useToast()
      const maxReactions = 10
      const cooldownTime = 5 * 60 * 1000 // 5 menit dalam milidetik
      const ipAddress = await getIpAddress()

      // Initialize IP reactions if not present
      if (!this.ipReactions[contentId]) {
        this.ipReactions[contentId] = {}
      }

      const currentTime = Date.now()
      const ipData = this.ipReactions[contentId][ipAddress]

      if (!ipData) {
        this.ipReactions[contentId][ipAddress] = { count: 0, lastLiked: 0 }
      }

      if (ipData && ipData.count >= maxReactions && currentTime - ipData.lastLiked < cooldownTime) {
        toast.add({
          title: 'Maximum Reactions Reached',
          description: `You have reached the maximum number of reactions (${maxReactions}) for this content. Please try again later.`,
          icon: 'i-octicon-alert-24',
        })
        return
      }

      if (ipData && currentTime - ipData.lastLiked >= cooldownTime) {
        ipData.count = 0 // Reset count after cooldown
      }

      if (!this.reactions[contentId]) {
        this.reactions[contentId] = { like: 0 }
      }
      this.reactions[contentId][reactionType]++

      this.ipReactions[contentId][ipAddress].count++
      this.ipReactions[contentId][ipAddress].lastLiked = currentTime
      localStorage.setItem(`ipReactions_${contentId}`, JSON.stringify(this.ipReactions[contentId]))

      // Simpan reaksi ke local storage
      localStorage.setItem(`reactions_${contentId}`, JSON.stringify(this.reactions[contentId]))
    },

    async syncReactions(contentId: string) {
      const supabase = useSupabaseClient()
      const localReactions = localStorage.getItem(`reactions_${contentId}`)

      if (localReactions) {
        const reactions = JSON.parse(localReactions)
        const { like } = reactions

        if (like > 0) {
          const ipAddress = await getIpAddress()
          try {
            const { error } = await supabase
              .from('reactions')
              .insert([
                { content_id: contentId, reaction_type: 'like', ip_address: ipAddress, count: like },
              ])

            if (error) {
              console.error('Error syncing reactions:', error)
              // Tangani error, misalnya tampilkan pesan error ke pengguna
              return
            }

            console.log('Reactions synced successfully')

            // Hapus data dari local storage setelah sinkronisasi
            localStorage.removeItem(`reactions_${contentId}`)
          }
          catch (error) {
            console.error('Error syncing reactions:', error)
            // Tangani error, misalnya tampilkan pesan error ke pengguna
          }
        }
      }
    },
  },
})

async function getIpAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  }
  catch (error) {
    console.error('Error fetching IP address:', error)
    return ''
  }
}
