<template>
  <div>
    <UChip :text="reactions.like" size="2xl">
      <UButton
      aria-label="Beri Reaksi"
        icon="i-ph-thumbs-up-duotone"
        color="gray"
        @click="handleReaction('like')"
      />
    </UChip>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  contentId: {
    type: String,
    required: true,
  },
})

const reactionsStore = useReactionsStore()
const reactions = computed(() => reactionsStore.reactions[props.contentId] || { like: 0 })
const toast = useToast()

const fetchReactions = async () => {
  console.log('Content ID:', props.contentId)
  await reactionsStore.fetchReactions(props.contentId)
}

const handleReaction = async (reactionType: 'like') => {
  console.log('Adding reaction of type:', reactionType)
  await reactionsStore.addReaction(props.contentId, reactionType)
  console.log('Reactions after adding:', reactions.value)
}

watch(reactions, (newValue) => {
  console.log('Reactions updated:', newValue)
})

onMounted(() => {
  fetchReactions()
})
</script>
