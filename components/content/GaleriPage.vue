<script setup>
const gambar = [
  {
    src: `https://cdn.pixabay.com/photo/2024/04/25/06/50/banana-8719086_1280.jpg`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2024/04/13/18/22/barberry-8694277_1280.jpg`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2024/01/09/22/11/avocado-8498520_1280.jpg`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2024/03/07/22/56/woman-8619512_1280.jpg`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2024/04/22/17/03/ai-generated-8713076_1280.png`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2023/12/26/17/38/ai-generated-8470716_1280.png`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2022/03/08/13/22/fan-7055740_1280.jpg`,
    title: 'lorem150',
  },
  {
    src: `https://cdn.pixabay.com/photo/2022/01/05/05/55/man-6916436_1280.jpg`,
    title: 'lorem150',
  },
]
</script>

<template>
  <UContainer class="md:py-6">
    <div class="py-4 md:py-8">
      <h1 class="headline">
        Kumpulan Karya Desain
      </h1>
    </div>
    <div className="masonry sm:masonry-sm space-y-4 md:masonry-md">
      <div
        v-for="(item, index) in gambar"
        :key="index"
        className="rounded-lg break-inside"
      >
        <div class="relative ">
          <div class="absolute bottom-0 p-1 bg-primary-700 dark:bg-opacity-75 dark:bg-permadi-800 bg-opacity-75  w-full rounded-b">
            <div class="w-full flex justify-between items-center">
              <p class="text-primary-200 text-xs">
                {{ item.title }}
              </p>

              <UIcon
                name="i-ph-leaf-duotone"
                class="text-primary-200"
              />
            </div>
          </div>
          <NuxtImg
            class="w-full h-auto object-contain rounded"
            :src="item.src"
            :alt="item.title"
            width="500"
            height="500"
            loading="lazy"
            :title="item.title"
            format="webp"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
