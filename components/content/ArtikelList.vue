<!-- eslint-disable ts/ban-ts-comment -->
<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const props = defineProps({
  path: {
    type: String,
    default: 'artikel',
  },
})

const { data: _articles } = await useAsyncData('artikel', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const articles = computed(() => _articles.value || [])
</script>

<template>
  <UContainer
    v-if="articles?.length"
    class="py-4 md:py-8 "
  >
    <div class="max-w-[100rem] ">
      <!-- Title -->
      <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h1
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          class="title"
        >
          List of Artikel written by Dinar Permadi Yusup
        </h1>
      </div>
      <!-- End Title -->

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
