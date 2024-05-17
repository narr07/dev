<script setup lang="ts">


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
  return (import.meta.env.DEV || useContentPreview()?.isEnabled()) ? props.article?._id : undefined
})

const isLoaded = ref(false)
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
          body: {
            padding: 'px-2 py-1.5 sm:px-2',
          },
          base: {
            padding: 'px-2 py-1.5 sm:px-2',
          },
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
        <div class="aspect-w-16 aspect-h-9 relative">
          <NuxtImg
            v-show="isLoaded"
            class="w-full object-cover rounded"
            :src="article.img"
            :alt="article.title"
            :title="article.title"
            format="webp"
            height="500"
            sizes="100vw sm:100vw md:100vw lg:100px"
            width="500"
            :placeholder="[100, 60, 35, 5]"
            @load="isLoaded = true"
          />
          <USkeleton
            v-show="!isLoaded"
            class="w-full h-full object-cover rounded"
            :ui="{ rounded: 'rounded' }"
          />
        </div>
        <div class="w-full justify-end flex py-2">
          <USkeleton v-if="!isLoaded" class="h-4 w-24" />
          <UBadge v-else size="xs" color="gray">
            <time>
              {{ formatDate(article.date) }}
            </time>
          </UBadge>
        </div>
        <div class="mb-2">
          <USkeleton v-if="!isLoaded" class="h-4 w-3/4" />
          <h2 v-else class="font-semibold font-body leading-tight text-gray-800 dark:text-gray-300">
            {{ article.title }}
          </h2>
        </div>
      </NuxtLink>
      <template #footer>
        <div class="flex flex-wrap">
          <NuxtLink
            v-for="(tag, n) in article.tags"
            :key="n"
            rel="tag"
            :title="`Tags: ${tag}`"
            :to="`/tags#${tag}`"
            class="uppercase"
          >
            <USkeleton v-if="!isLoaded" class="h-4 w-16 mr-2" />
            <UBadge v-else color="black" size="xxs" class="mr-2">
              {{ tag }}
            </UBadge>
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </article>
</template>
