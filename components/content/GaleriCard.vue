<!-- eslint-disable nuxt/prefer-import-meta -->
<script setup lang="ts">
import { useContentPreview } from '#imports'

interface Galeri {
  _path: string
  title: string
  description: string
  image: string
  tags: string[]
  tools: string[]

}

const props = defineProps({
  galeri: {
    type: Object,
    required: true,
    validator: (value: Galeri) => {
      if (value?._path && value.title)
        return true
      return false
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
})

const id = computed(() => {
  return (process.dev || useContentPreview()?.isEnabled()) ? props.galeri?._id : undefined
})
const isOpen = ref(false)
</script>

<template>
  <div
    v-if="galeri._path && galeri.title"
    :data-content-id="id"
    class="rounded-lg break-inside"
  >
    <div class="relative ">
      <div
        class="absolute bottom-0 p-1 bg-primary-700 dark:bg-opacity-75 dark:bg-permadi-800 bg-opacity-75  w-full rounded-b"
      >
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
        @click="isOpen = true"
      />
    </div>
    <UModal
      v-model="isOpen"
      :ui="{
        container: 'flex min-h-full items-center sm:items-center justify-center text-center',
      }"
    >
      <UCard
        :ui="{
          header: {
            padding: 'px-2 py-1 sm:px-4',
          },
          footer: {
            padding: 'px-2 py-2 sm:px-4',
          },
        }
        "
      >
        <template #header>
          <div class="w-full  flex justify-end">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="w-full mx-auto">
          <NuxtImg
            class="w-full object-cover rounded-md aspect-video"
            :src="galeri.image"
            :alt="galeri.title"
            :placeholder="[50, 25, 75, 5]"
          />
        </div>
        <template #footer>
          <p class="">
            {{ galeri.title }}
          </p>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
