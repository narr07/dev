<template>
  <div>
    <UChip
      :text="reactions.like"
      size="2xl"
    >
      <UButton
        icon="i-ph-thumbs-up-duotone"
        color="gray"
        @click="sendReaction('like')"
      />
    </UChip>
  </div>
</template>

<script setup lang="ts">
// Definisikan tipe untuk reaction types
type ReactionType = 'like'

interface Reaction {
  reaction_type: ReactionType
  count: number
}

const props = defineProps({
  articleId: {
    type: String, // Ubah tipe menjadi String
    required: true,
  },
})

const reactions = ref<{ like: number }>({ like: 0 })
const supabase = useSupabaseClient()

const fetchReactions = async () => {
  console.log('Fetching reactions for article ID:', props.articleId)
  const { data, error } = await supabase
    .rpc('get_reactions', { article_id: props.articleId })
  if (error) {
    console.error('Error fetching reactions:', error)
  }
  else {
    console.log('Fetched reactions:', data)
    if (data) {
      const reactionCounts = (data as Reaction[]).reduce((acc: { [key in ReactionType]: number }, row: Reaction) => {
        acc[row.reaction_type] = row.count
        return acc
      }, { like: 0 })
      console.log('Setting reactions:', reactionCounts)
      reactions.value = reactionCounts
    }
  }
}

const sendReaction = async (reactionType: ReactionType) => {
  const maxReactions = 10
  const reactionKey = `reactions_${props.articleId}_${reactionType}`
  const totalReactionsKey = `reactions_${props.articleId}_total`
  const currentReactions = parseInt(localStorage.getItem(reactionKey) || '0', 10)
  const totalReactions = parseInt(localStorage.getItem(totalReactionsKey) || '0', 10)

  if (totalReactions >= maxReactions) {
    console.log(`You have reached the maximum number of reactions for this article.`)
    return
  }

  console.log('Sending reaction:', reactionType)
  const ipAddress = await getIpAddress()
  console.log('IP Address:', ipAddress)

  const { error } = await supabase
    .from('reactions')
    .insert([
      { article_id: props.articleId, ip_address: ipAddress, reaction_type: reactionType },
    ])

  if (error) {
    console.error('Error sending reaction:', error)
  }
  else {
    console.log('Reaction sent successfully')
    reactions.value[reactionType]++
    localStorage.setItem(reactionKey, (currentReactions + 1).toString())
    localStorage.setItem(totalReactionsKey, (totalReactions + 1).toString())
  }
}

const getIpAddress = async (): Promise<string> => {
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

onMounted(() => {
  fetchReactions()
})
</script>
