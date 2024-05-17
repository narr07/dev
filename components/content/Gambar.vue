<template>
  <div class="pb-2">
    <div class=" relative pb-1 ">
      <div class="absolute w-full bottom-0">
        <p class="text-[0.6rem] italic text-center">
          {{ title }}
        </p>
      </div>
      <NuxtImg
        v-if="url"
        :src="url"
        :alt="title"
        format="webp"
        width="500"
        height="500"
        loading="lazy"
        :title="title"
        class=" h-48  sm:h-72 md:h-80 lg:h-96 w-full object-cover aspect-video bg-cover rounded-md"
        sizes="100vw sm:100vw md:100vw lg:100px"
        :placeholder="[100, 60, 35, 5]"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Gambar - Permadi',
  },
  url: {
    type: String,
    default: '',
  },
})
</script>
