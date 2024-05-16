<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">


// Ambil rute saat ini
const route = useRoute()
const { page } = useContent()

// Buat computed property untuk mendapatkan contentId dari page data
const contentId = computed(() => {
  return page.value?._id || null
})

// Debugging untuk memastikan page data tersedia
watch(page, () => {
  console.log('Page data:', page.value)
  if (!page.value) {
    console.error('Page data is not available')
  }
})

const emit = defineEmits(['move'])

const article = ref<HTMLElement | null>(null)

const parentPath = computed(() => {
  const pathTabl = route.path.split('/')
  pathTabl.pop()
  return pathTabl.join('/')
})

const router = useRouter()
const { activeHeadings, updateHeadings } = useScrollspy()
watch(() => route.path, () => {
  setTimeout(() => {
    if (import.meta.client) {
      updateHeadings([
        ...document.querySelectorAll('h2'),
        ...document.querySelectorAll('h3'),
      ])
    }
  }, 300)
}, { immediate: true })

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    window.setTimeout(() => {
      window.scrollBy({
        top: element.getBoundingClientRect().top -50,
        // top: element.getBoundingClientRect().top - 80,
        behavior: 'smooth',
      })
    }, 100)
    emit('move', id)
  }
}

const networks = [
  { network: 'email', icon: 'i-ph-envelope-duotone' },
  { network: 'facebook', icon: 'i-ph-facebook-logo-duotone' },
  { network: 'linkedin', icon: 'i-ph-linkedin-logo-duotone' },
  { network: 'messenger', icon: 'i-ph-messenger-logo-duotone' },
  { network: 'pinterest', icon: 'i-ph-pinterest-logo-duotone' },
  { network: 'telegram', icon: 'i-ph-telegram-logo-duotone' },
  { network: 'twitter', icon: 'i-ph-twitter-logo-duotone' },
  { network: 'whatsapp', icon: 'i-ph-whatsapp-logo-duotone' },
]

const isLoaded = ref(false)
const hashtags = computed(() => {
  return page.value?.tags ? page.value.tags.join(', ') : ''
})
defineOgImageComponent('OgImage', {
  title: page.title,
})
useSeoMeta({
  title: () => page.title,
  description: () => page.description,

})
</script>

<template>
  <div>
    <UContainer class="py-14 scroll-smooth md:py-16">
      <div class="max-w-3xl mx-auto">
        <UBreadcrumb
          class="my-4 px-2 shadow py-1 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg text-lg  bg-white text-permadi-800 dark:text-permadi-200 dark:bg-gray-900  inset-x-0 text-center z-30"
          divider=">"
          :links="[{ label: 'Home', to: '/' }, { label: 'Artikel', to: '/artikel' }]"
        />
        <UCard
          :ui="
            {
              header: {
                padding: 'px-2 py-0 sm:py-0 sm:px-4',
              },
            }
          "
          class="ring-1  ring-primary-800 hover:ring-gray-600 dark:hover:ring-gray-800   dark:ring-gray-800  p-2  sm:p-3 bg-yellow dark:bg-gray-900"
        >
          <template #header>
            <div class="flex justify-between text-sm">
              <p v-if="page?.author">
                Penulis: {{ page.author }}
              </p>
              <USkeleton v-else class="h-4 w-24" />
              <UBadge v-if="page?.date" size="xs" color="white">
                <time>
                  {{ formatDate(page.date) }}
                </time>
              </UBadge>
              <USkeleton v-else class="h-4 w-16" />
            </div>
          </template>
          <div class="aspect-w-16 aspect-h-9 relative">
            <NuxtImg
              v-show="isLoaded"
              class="w-full object-cover rounded"
              :src="page.img"
              :alt="page.title"
              :title="page.title"
              format="webp"
              height="500"
              width="500"
              sizes="sm:200px md:400px lg:800px"
              :placeholder="[50, 25, 75, 5]"
              @load="isLoaded = true"
            />
            <USkeleton v-show="!isLoaded" class="w-full h-full object-cover rounded" :ui="{ rounded: 'rounded' }" />
          </div>
          <div class="py-4 ">
            <h1 v-if="isLoaded" class="font-bold text-xl md:text-g2 headline font-title leading-tight title text-left">
              {{ page.title }}
            </h1>
            <USkeleton v-else class="h-8 w-full" />
          </div>
          <p v-if="isLoaded" class="leading-tight text-sm">
            {{ page.description }}
          </p>
          <USkeleton v-else class="h-4 w-full" />
          <template #footer>
            <div v-if="page?.tags">
              <div class="flex flex-wrap ">
                <NuxtLink
                  v-for="(tag, n) in page.tags"
                  :key="n"
                  :to="`/tags#${tag}`"
                  class="uppercase"
                >
                  <UBadge v-if="isLoaded" class="mr-2" size="xs" color="black">
                    {{ tag }}
                  </UBadge>
                  <USkeleton v-else class="h-4 w-16 mr-2" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </UCard>
        <!-- konten -->
        <UCard
          class="my-4 ring-gray-200 dark:ring-gray-800  flex-1 flex flex-col shadow hover:ring-gray-200 dark:hover:ring-ring-gray-800"
        >
          <div
            v-if="isLoaded"
            class="prose mx-auto prose-permadi prose-img:mx-auto prose-img:w-full prose-sm sm:prose-base  dark:prose-invert"
          >
            <slot />
          </div>
          <USkeleton v-else class="w-full h-64" />
        </UCard>
        <!-- Tambahkan Log untuk Debugging -->

        <!-- sticki butom -->
        <div class="sticky bottom-3 inset-x-0 text-center">
          <div
            class="inline-block relative group isolate rounded-lg background-gradient ring-1 ring-gray-200 dark:ring-gray-800  p-1  sm:p-3 bg-white dark:bg-gray-900 "
          >
            <div class="flex items-center gap-x-1.5">
              <UPopover :popper="{ arrow: true }" overlay>
                <UTooltip text="Daftar Isi">
                  <UButton
                    aria-label="Daftar Isi"
                    size="xs"
                    square
                    color="white"
                    trailing-icon="i-ph-list-dashes-duotone"
                  />
                </UTooltip>
                <template #panel="{ close }">
                  <div class="p-3  w-80  ">
                    <h3>Daftar Isi</h3>
                    <div
                      v-for="link of page.body.toc.links"
                      :key="link.id"
                      class="flex flex-col"
                      :class="{ 'ml-1': link.depth === 3 }"
                    >
                      <a
                        class="text-sm my-1 px-2 p-1 line-clamp-1 ring-1 rounded-md ring-gray-200 hover:ring-gray-400 dark:hover:ring-gray-600  dark:ring-gray-800 text-left"
                        :href="`#${link.id}`"
                        :class="[activeHeadings.includes(link.id) ? 'text-primary-800 bg-yellow dark:bg-yellow-700 dark:text-primary-900' : 'hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300']"
                        @click.prevent="scrollToHeading(link.id)"
                      >
                        <p @click="close">
                          {{ link.text }}
                        </p>
                      </a>
                    </div>
                  </div>
                </template>
              </UPopover>
              <div class="block h-3 border-e border-gray-300 mx-1 dark:border-gray-600" />
              <div class="hs-tooltip inline-block">
                <UPopover :popper="{ arrow: true }" overlay>
                  <UTooltip text="Bagikan Artikel">
                    <UButton
                      aria-label="Bagikan Artikel"
                      size="xs"
                      color="white"
                      trailing-icon="i-ph-share-fat-duotone"
                    />
                  </UTooltip>
                  <template #panel="{ close }">
                    <div class="flex p-1 items-center gap-x-1.5">
                      <ClientOnly>
                        <ShareNetwork
                          v-for="network in networks"
                          :key="network.network"
                          :network="network.network"
                          :url="`https://dev-permadi.vercel.app${page._path}/`"
                          :title="page.title"
                          :description="page.description"
                          :quote="page.quote"
                          :hashtags="hashtags"
                          twitter-user="dinarpermadi07"
                        >
                          <UButton
                            :icon="network.icon"
                            @click="close"
                          />
                        </ShareNetwork>
                      </ClientOnly>
                    </div>
                  </template>
                </UPopover>
              </div>
              <div class="block h-3 border-e border-gray-300 mx-1 dark:border-gray-600" />
              <div v-if="page && contentId">
                <!-- Konten artikel lainnya -->
                <ReactionButton :content-id="contentId" />
              </div>
              <div v-else>
                <USkeleton class="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <!-- <Footer /> -->
  </div>
</template>
