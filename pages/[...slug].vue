<script lang="ts" setup>
const { page } = useContent()

defineOgImageComponent('OgImage', {
  title: page.title,
})
useSeoMeta({
  title: () => page.title,
  description: () => page.description,
  // ogImage: () => `https://dev-permadi.vercel.app/__og-image__/image${page._path}/og.png`,
  twitterTitle: () => page.title,
  twitterDescription: () => page.description,
  // twitterImage: () => `https://dev-permadi.vercel.app/__og-image__/image${page._path}/og.png`,
  // twitterCard: 'summary_large_image',
})

// useSeoMeta({
//   title: () => page.title,
//   description: () => page.description,
//   // ogImage: '[og:image]',
//   twitterTitle: '[twitter:title]',
//   twitterDescription: '[twitter:description]',
//   twitterImage: '[twitter:image]',
//   twitterCard: 'summary',
// })
// useSeoMeta({
//   title: () => page.title,
//   description: () => page.description,
// })
useHead({
  htmlAttrs: {
    lang: 'id',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <ContentDoc />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.9);
  /* filter: blur(1rem); */
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
