<script lang="ts" setup>
const { page } = useContent()

defineOgImageComponent('OgImage', {
  title: page.title,
  description: page.description,
})
</script>

<template>
  <div>
    <div class="py-20 px-2 ">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
