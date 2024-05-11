<script setup lang="ts">
import SvgDesigner from './SvgDesigner.vue'
import SvgGuru from './SvgGuru.vue'
import SvgProgrammer from './SvgProgrammer.vue'

const items = [
  SvgDesigner,
  SvgGuru,
  SvgProgrammer,
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})

const tabitems = [{
  label: 'Hallo 😄',
  slot: 'user',
  icon: 'i-ph-user-duotone',

}, {
  label: 'Desain',
  slot: 'desain',
  icon: 'i-ph-palette-duotone',

}, {
  label: 'Teknologi',
  slot: 'teknologi',
  icon: 'i-ph-code-duotone',

}]
</script>

<template>
  <UContainer>
    <div class="grid md:grid-cols-2 h-full gap-4">
      <UCard class="cardHover">
        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="items"
          :ui="{
            item: 'basis-full',

          }"
          class="mx-auto rounded-lg overflow-hidden"
        >
          <component
            :is="item"
            class="justify-center mx-auto"
          />
        </UCarousel>
      </UCard>

      <UTabs
        class="h-full"
        :items="tabitems"
      >
        <template #default="{ item }">
          <div class="flex items-center gap-2 relative truncate">
            <UIcon
              :name="item.icon"
              class="w-4 h-4  flex-shrink-0"
            />
            <span>
              {{ item.label }}
            </span>
          </div>
        </template>
        <template #user>
          <UCard class="cardHover h-full">
            <p>
              Saya <span class="text-permadi-950 dark:text-yellow font-bold">

                Dinar Permadi Yusup,
              </span>
              Seorang Guru, Desainer, dan Programmer
            </p>
          </UCard>
        </template>
        <template #desain>
          <UCard class="cardHover h-full">
            <div class=" p-2 items-center gap-4 md:gap-8">
              <div class="flex flex-col h-full justify-center pb-4 md:pb-0 w-full" />
            </div>
          </UCard>
        </template>
        <template #teknologi>
          <UCard class="cardHover h-full">
            <div class=" p-2 items-center gap-4 md:gap-8">
              <div class="flex flex-col h-full justify-center pb-4 md:pb-0 w-full" />
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>
