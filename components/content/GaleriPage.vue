<script setup>
import { withTrailingSlash } from 'ufo'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const props = defineProps({
  path: {
    type: String,
    default: 'galeri',
  },
})

const { data: _galeri } = await useAsyncData('galeri', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const galeris = computed(() => _galeri.value || [])
</script>

<template>
  <UContainer
    v-if="galeris?.length"
    class="md:py-6"
  >
    <div class="py-4 md:py-8">
      <h1 class="headline">
        Kumpulan Karya Desain
      </h1>
    </div>

    <!-- <div
        v-for="(item, index) in gambar"
        :key="index"
        className="rounded-lg break-inside"
      > -->
    <div class="masonry sm:masonry-sm space-y-4 md:masonry-md">
      <div>
        <GaleriCard
          v-for="(galeri, index) in galeris.slice(0)"
          :key="index"
          :galeri="galeri"
        />
      </div>
    </div>
    <!-- <div
          class="relative "
        >
          <div class="absolute bottom-0 p-1 bg-primary-700 dark:bg-opacity-75 dark:bg-permadi-800 bg-opacity-75  w-full rounded-b">
            <div class="w-full flex justify-between items-center">
              <p class="text-primary-200 text-xs">
                {{ galeri.title }}
              </p>

              <UIcon
                name="i-ph-leaf-duotone"
                class="text-primary-200"
              />
            </div>
          </div>
          <NuxtImg
            class="w-full h-auto object-contain rounded"
            :src="galeri.image"
            :alt="galeri.title"
            width="500"
            height="500"
            loading="lazy"
            :title="galeri.title"
            format="webp"
          />
          </galericard>
        </div>
        <UModal
          v-model="isOpen"
          :ui="{
            inner: 'inset-4  ',
            // wrapper: 'z-20',
            container: ' items-center  ',
            padding: 'p-2 sm:p-0',
            ring: 'ring-1 ring-primary',
          }"
          :overlay="true"
        >
          <UCard
            :ui="{
              header: {
                padding: 'px-2 py-2 sm:px-2 sm:py-2 ',
              },
              footer: {
                padding: 'px-2 py-1.5 sm:px-2 sm:py-2 ',
              },
            }"
          >
            <div class="pb-4">
              <h3 class="text-center">
                {{ galeri.title }}
              </h3>
            </div>
            <NuxtImg
              v-if="galeri.image"
              height="500"
              width="500"
              :src="galeri.image"
              :alt="galeri.title"
              :title="galeri.title"
              class="bg-contain object-contain sm:w-48 sm:h-48 lg:w-60 lg:h-60 mx-auto"
            />

            <div class="flex justify-between items-center">
              <UTooltip :popper="{ arrow: true }" text="Tools">
            <Icon :name="galeri.tools" size="32" />
          </UTooltip>
        <div class="flex justify-end">
          <div class="flex items-center justify-end">
            <UButton
              aria-label="close"
              variant="outline"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </div>
      </div>
      </UCard>
      </UModal> -->
  </UContainer>
</template>
