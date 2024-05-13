<script setup>
import { ref, computed } from 'vue'
import { withTrailingSlash } from 'ufo'

const props = defineProps({
  path: {
    type: String,
    default: 'galeri',
  },
})

const selectedTool = ref('All')

const { data: _galeri } = await useAsyncData('galeri', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const galeris = computed(() => {
  if (selectedTool.value === 'All') {
    return _galeri.value || []
  }
  return (_galeri.value || []).filter(galeri => galeri.tools.includes(selectedTool.value))
})

const allTools = computed(() => {
  const tools = new Set()
  _galeri.value.forEach((galeri) => {
    galeri.tools.forEach(tool => tools.add(tool))
  })
  return ['All', ...Array.from(tools)]
})
</script>

<template>
  <UContainer
    v-if="galeris?.length"
    class="md:py-6"
  >
    <div class="py-4 md:py-8">
      <h1 class="headline">
        Kumpulan Karya Desain
      </h1>
      <pre>{{ allTools }}</pre>
      <div>
        <USelectMenu
          v-model="selectedTool"
          :options="allTools"
          placeholder="Pilih tool"
          @select="selectedTool = $event"
        >
          <template #leading>
            <UIcon

              :name="allTools"
              class="w-5 h-5"
            /> <span>{{ allTools }}</span>
          </template>
        </USelectMenu>
      </div>
    </div>

    <div class="masonry sm:masonry-sm space-y-4 md:masonry-md">
      <div>
        <GaleriCard
          v-for="(galeri, index) in galeris.slice(0)"
          :key="index"
          :galeri="galeri"
        />
      </div>
    </div>
  </UContainer>
</template>
