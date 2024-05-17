<!-- eslint-disable nuxt/prefer-import-meta -->
<script setup lang="ts">
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
const isLoaded = ref(false)
</script>

<template>
  <div
    v-if="galeri._path && galeri.title"
    :data-content-id="id"
    class="rounded-lg py-2 break-inside"
  >
    <div class="relative ">
      <div
        class="absolute bottom-0 p-1 bg-primary-700 dark:bg-opacity-75 dark:bg-permadi-800 bg-opacity-75  w-full rounded-b"
      >
        <div class="w-full flex justify-between items-center">
          <USkeleton
            v-if="!isLoaded"
            class="h-4 w-24"
          />
          <p
            v-else
            class="text-primary-200 text-xs"
          >
            {{ galeri.title }}
          </p>

          <USkeleton
            v-if="!isLoaded"
            class="h-5 w-5"
            :ui="{ rounded: 'rounded-full' }"
          />
          <UIcon
            v-else
            :name="galeri.tools[0].icon"
            class="text-primary-200"
          />
        </div>
      </div>
      <NuxtImg
        v-show="isLoaded"
        class="w-full h-auto object-contain rounded"
        :src="galeri.image + '/m/1000x0/smart/'"
        :alt="galeri.title"

        width="500"
        height="500"
        loading="lazy"
        :placeholder="[100, 60, 35, 5]"
        sizes="100vw sm:50vw md:400px lg:500px"
        :title="galeri.title"
        format="webp"
        :modifiers="{ smart: true }"
        @load="isLoaded = true"
        @click="isOpen = true"
      />
      <USkeleton
        v-show="!isLoaded"
        class="w-full h-64 rounded"
        :ui="{ rounded: 'rounded' }"
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
            padding: 'px-2 py-1 sm:py-1 sm:px-4',
          },
          body: {
            padding: 'px-0 py-0 sm:px-0 sm:py-0 sm:p-0',
          },
        }
        "
      >
        <template #header>
          <div class="w-full flex justify-end">
            <UButton
              aria-label="Tutup Modal"
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
            v-show="isLoaded"
            class="h-[300px] w-full object-contain rounded-md aspect-video"
            :src="galeri.image + '/m/1000x0/smart/'"
            :alt="galeri.title"
            format="webp"
            sizes="100vw sm:50vw md:400px lg:500px"
            :modifiers="{ smart: true }"
            quality="80"
            height="500"
            width="500"
            :placeholder="[100, 60, 35, 5]"
            @load="isLoaded = true"
          />
          <USkeleton
            v-show="!isLoaded"
            class="w-full rounded-md aspect-video"
            :ui="{ rounded: 'rounded-md' }"
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
