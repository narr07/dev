<script lang="ts" setup>
const { data: info } = await useAsyncData(() =>
  globalThis.$fetch('/api/info', {
    headers: useRequestHeaders(['x-forwarded-for', 'x-vercel-ip-city']),
  }),
)

const generatedAt = useState(() => new Date().toISOString())

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
      <div>
        Your IP address: <span>{{ info?.ip }}</span>
        <div>
          Your City: <span>{{ info?.city }}</span>
        </div>

        <div>
          Generated at: <span>{{ generatedAt }}</span>
        </div>
      </div>
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
