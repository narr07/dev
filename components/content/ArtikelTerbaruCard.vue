<script setup lang="ts">
import { useContentPreview } from '#imports'

interface Article {
  _path: string
  title: string
  date: string
  description: string
  cover: string
  image: string

}

const props = defineProps({
  article: {
    type: Object,
    required: true,
    validator: (value: Article) => {
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
  return (import.meta.dev || useContentPreview()?.isEnabled()) ? props.article?._id : undefined
})
</script>

<template>
  <article
    v-if="article._path && article.title"
    data-aos="fade-up"
    data-aos-anchor-placement="top-bottom"
    :data-content-id="id"
    class="h-full"
  >
    <UCard
      :ui="
        {
          footer: {
            padding: 'px-2 py-1.5 sm:px-4',
          },
          header: {
            padding: 'px-1 py-1 sm:px-4',
          },
        }
      "
      class="h-full cardHover"
    >
      <NuxtLink
        :to="article._path"
        :title="article.title"
      >

        <div class="mb-2">
          <h2 class="font-semibold font-body leading-tight text-gray-800 dark:text-gray-300 ">
            {{ article.title }}
          </h2>
        </div>
      </NuxtLink>
      <template #footer>
        <div class="flex flex-wrap ">
          <NuxtLink
            v-for="(tag, n) in article.tags"
            :key="n"
            rel="tag"
            :title="`Tags: ${tag}`"

            :to="`/tags#${tag}`"
            class="uppercase"
          >
            <UBadge
              color="black"
              size="xxs"
              class="mr-2"
            >
              {{ tag }}
            </UBadge>
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </article>
</template>
