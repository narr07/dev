<template>
  <div>
    <div class="py-20 px-2 ">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const { page } = useContent()
defineOgImageComponent('OgImage', {
  title: page.title,
})
useSeoMeta({
  title: () => page.title,
  description: () => page.description,

})
</script>