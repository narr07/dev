<template>
  <ClientOnly>
    <UChip
      :text="reactions.like"
      size="2xl"
    >
      <UButton
        aria-label="Beri Reaksi"
        icon="i-ph-thumbs-up-duotone"
        color="gray"
        @click="handleReaction('like')"
      />
    </UChip>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  contentId: {
    type: String,
    required: true,
  },
})

const reactionsStore = useReactionsStore()
const reactions = computed(() => reactionsStore.reactions[props.contentId] || { like: 0 })

const fetchReactions = async () => {
  await reactionsStore.fetchReactions(props.contentId)
}

const handleReaction = async (reactionType: 'like') => {
  await reactionsStore.addReaction(props.contentId, reactionType)
}

// Sinkronkan reaksi ketika pengguna meninggalkan halaman
onUnmounted(async () => {
  await reactionsStore.syncReactions(props.contentId)
})

onMounted(() => {
  fetchReactions()
})
</script>
