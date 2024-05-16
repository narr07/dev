<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between items-start bg-[#031E1C] p-20 pt-24 pb-16">
    <div
    class="w-full h-full flex flex-col inset-0 absolute";
      style="background: radial-gradient(50% 50% at 50% 50%, #004643 0%, rgba(0, 220, 130, 0) 100%);filter: blur(180.5px);opacity: 0.5;"
    />
    <div>
      <h1 class="text-6xl mb-4 text-[#F9BC60] flex items-center">
        <span>{{ title }}</span>
        <img
          v-if="image"
          :src="image"
          class="h-20 w-20 rounded ml-8"
        >
      </h1>
      <div
        class="text-gray-200 py-10  line-clamp-2 leading-tight pr-10"
        :class="description?.length > 100 ? 'text-3xl' : 'text-5xl'"
      />
    </div>
    <div class="flex flex-row items-center">

      <LogoOgImg />
      <h2 class="pl-4 text-[#F9BC60]">Dinar Permadi Yusup</h2>
    </div>
  </div>
</template>

<style scoped>
._gradient {
}
</style>
