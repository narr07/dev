// stores/reactions.ts
import { defineStore } from 'pinia'

export const useReactionsStore = defineStore('reactions', {
  state: () => ({
    reactions: {} as Record<string, { like: number }>,
    ipReactions: {} as Record<string, Record<string, { count: number, lastLiked: number }>>,
  }),
  actions: {
    async fetchReactions(contentId: string) {
      const supabase = useSupabaseClient()
      console.log('Fetching reactions for content ID:', contentId)
      const { data, error } = await supabase.rpc('get_reactions', { content_id: contentId })
      if (error) {
        console.error('Error fetching reactions:', error)
        return
      }
      console.log('Fetched reactions:', data)
      const reactionCounts = { like: 0 }
      if (data) {
        (data as any[]).forEach((row) => {
          if (row.reaction_type === 'like') {
            reactionCounts.like = row.count
          }
        })
      }
      this.reactions[contentId] = reactionCounts
      console.log('Updated reaction state:', this.reactions)

      // Load IP reactions from localStorage
      const storedIpReactions = localStorage.getItem(`ipReactions_${contentId}`)
      if (storedIpReactions) {
        this.ipReactions[contentId] = JSON.parse(storedIpReactions)
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

      if (ipData && ipData.count >= maxReactions && (currentTime - ipData.lastLiked) < cooldownTime) {
        toast.add({
          title: 'Maximum Reactions Reached',
          description: `You have reached the maximum number of reactions (${maxReactions}) for this content. Please try again later.`,
          icon: 'i-octicon-alert-24',
        })
        return
      }

      if (ipData && (currentTime - ipData.lastLiked) >= cooldownTime) {
        ipData.count = 0 // Reset count after cooldown
      }

      if (!this.reactions[contentId]) {
        this.reactions[contentId] = { like: 0 }
      }
      this.reactions[contentId][reactionType]++
      console.log('Local reactions updated:', this.reactions[contentId])

      this.ipReactions[contentId][ipAddress].count++
      this.ipReactions[contentId][ipAddress].lastLiked = currentTime
      localStorage.setItem(`ipReactions_${contentId}`, JSON.stringify(this.ipReactions[contentId]))

      // Simpan jumlah reaksi lokal untuk sinkronisasi nanti
      const reactionKey = `reactions_${contentId}_${reactionType}`
      const currentReactions = parseInt(localStorage.getItem(reactionKey) || '0', 10)
      localStorage.setItem(reactionKey, (currentReactions + 1).toString())

      // Sinkronkan setiap reaksi dengan Supabase
      await this.syncReactions(contentId)
    },
    async syncReactions(contentId: string) {
      const supabase = useSupabaseClient()

      const reactionKey = `reactions_${contentId}_like`
      const currentReactions = parseInt(localStorage.getItem(reactionKey) || '0', 10)

      if (currentReactions > 0) {
        const ipAddress = await getIpAddress()
        console.log('IP Address:', ipAddress)

        const { error } = await supabase
          .from('reactions')
          .insert([
            { content_id: contentId, reaction_type: 'like', ip_address: ipAddress, count: currentReactions },
          ])

        if (error) {
          console.error('Error syncing reactions:', error)
          return
        }
        console.log('Reactions synced successfully')

        // Clear the local storage after syncing
        localStorage.removeItem(reactionKey)

        // Fetch reactions again to refresh the state
        await this.fetchReactions(contentId)
      }
    }
  }
})

async function getIpAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error('Error fetching IP address:', error)
    return ''
  }
}
