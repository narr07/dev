<!-- eslint-disable ts/ban-ts-comment -->
<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const currentPage = ref(1)
const itemsPerPage = ref(1)

const props = defineProps({
  path: {
    type: String,
    default: 'artikel',
  },
})

const selectedTag = ref('All')

const { data: _articles } = await useAsyncData('artikel', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const articles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  if (selectedTag.value === 'All') {
    return (_articles.value || []).slice(start, end)
  }
  return (_articles.value || []).filter(article => article.tags.includes(selectedTag.value)).slice(start, end)
})

const totalPages = computed(() => {
  if (selectedTag.value === 'All') {
    return Math.ceil((_articles.value || []).length / itemsPerPage.value)
  }
  return Math.ceil((_articles.value || []).filter(article => article.tags.includes(selectedTag.value)).length / itemsPerPage.value)
})

const allTags = computed(() => {
  const tags = new Set()
  if (_articles.value) {
    _articles.value.forEach((article) => {
      if (article.tags) {
        article.tags.forEach((tag: string) => tags.add(tag))
      }
    })
  }
  return ['All', ...Array.from(tags)]
})
</script>

<template>
  <UContainer
    v-if="articles?.length"
    class="py-4 md:py-8 "
  >
    <div class="max-w-[100rem] ">
      <!-- Title -->
      <div class="max-w-2xl mx-auto text-center mb-10 ">
        <h1

          class="headline"
        >
          List of Artikel written by Dinar Permadi Yusup
        </h1>
      </div>
      <!-- End Title -->
      <div class="flex pb-4 justify-center md:justify-end">
        <USelectMenu
          v-slot="{ open }"
          v-model="selectedTag"
          :popper="{ placement: 'bottom' }"
          class="w-60  "
          :options="allTags as string[]"
        >
          <UButton
            color="gray"
            class="flex-1 justify-between"
          >
            <span class="capitalize">

              {{ selectedTag }}
            </span>

            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
              :class="[open && 'transform rotate-90']"
            />
          </UButton>
        </USelectMenu>
      </div>

      <!-- Grid -->
      <div
        class="grid md:grid-cols-2  gap-6"
      >
        <ArtikelCard
          v-for="(article, index) in articles.slice(0)"
          :key="index"
          :article="article"
        />

        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>

    <UPagination
      v-model="currentPage"
      :page-count="itemsPerPage"
      :max="2"
      :total="totalPages"
    />
  </UContainer>
  <div
    v-else
    class="tour"
  >
    <p>Seems like there are no articles yet.</p>
    <p>
      You can start by
      <!-- eslint-disable-next-line -->
      <ProseA href="https://alpine.nuxt.space/articles/write-articles">creating</ProseA> one in the <ProseCodeInline>articles</ProseCodeInline> folder.
    </p>
  </div>
</template>
