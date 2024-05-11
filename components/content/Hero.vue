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
  label: 'Pendidikan',
  icon: 'i-ph-graduation-cap-duotone',
  content: 'Dalam ranah pendidikan, saya menghadirkan informasi terkini seputar perkembangan dunia pendidikan, metode pembelajaran inovatif, dan berbagai artikel inspiratif untuk membantu Anda memahami dan merencanakan perjalanan pendidikan yang sukses.',
}, {
  label: 'Desain',
  icon: 'i-ph-palette-duotone',
  content: 'Jelajahi keindahan dunia seni melalui artikel-artikel yang membahas beragam bentuk seni, termasuk seni visual, musik, teater, dan lebih banyak lagi. Dapatkan wawasan mendalam tentang kreativitas, teknik seni terkini, serta inspirasi untuk memperkaya pengalaman seni Anda.',
}, {
  label: 'Teknologi',
  icon: 'i-ph-code-duotone',
  content: 'Melibatkan diri dalam dunia teknologi yang cepat berubah dengan mengikuti berita terbaru, tren terkini, dan perkembangan terkini di bidang teknologi. Temukan ulasan perangkat lunak, panduan pengembangan, dan artikel informatif lainnya.',
}]
</script>

<template>
  <UContainer>
    <div class="grid md:grid-cols-2 gap-4">
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

      <UTabs :items="tabitems">
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
        <template #item="{ item }">
          <UCard class="cardHover">
            <div class=" p-2 items-center gap-4 md:gap-8">
              <div class="flex flex-col justify-center pb-4 md:pb-0 w-full">
                <h2 class="font-title">
                  {{ item.label }}
                </h2>
                <p class="mt-1 md:text-left">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>
