<template>
  <UCard
    :ui="
      {
        header: {
          padding: 'py-0 sm:py-0',
        },

      }
    "
  >
    <template #header>
      <di class="flex text-xs items-center justify-between">
        <p>
          {{
            title
          }}
        </p>
      </di>
    </template>
    <template #footer>
      <div class="flex items-center justify-end text-xs">
        <ULink
          :to="url"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          download
          target="_blank"
        >
          Download
        </ULink>
      </div>
    </template>
    <embed

      :src="url"
      class="w-full h-96"
    >
  </UCard>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dokumen',
  },
  url: {
    type: String,
    default: '',
  },
})
</script>
