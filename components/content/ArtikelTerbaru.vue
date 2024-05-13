<!-- eslint-disable ts/ban-ts-comment -->
<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const props = defineProps({
  path: {
    type: String,
    default: 'artikel',
  },
})

const { data: _articles } = await useAsyncData('artikel', async () => {
  const articles = await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find()
  return articles.slice(0, 3)
})

const articles = computed(() => _articles.value || [])
</script>

<template>
  <UContainer
    v-if="articles?.length"
    class="py-4 md:py-8 "
  >
    <div class="max-w-[85rem] ">
      <div class="py-10">
        <h1 class="headline">
          Artikel & tutotrial Terbaru
        </h1>
      </div>
      <!-- Grid -->
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3   gap-6"
      >
        <ArtikelTerbaruCard
          v-for="(article, index) in articles.slice(0)"
          :key="index"
          :article="article"
        />

        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>
  </UContainer>
  <div
    v-else
    class="tour"
  >
    <p>Seems like there are no articles yet.</p>
  </div>
</template>
