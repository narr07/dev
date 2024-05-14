<script setup>
import { ref, computed } from 'vue'
import { withTrailingSlash } from 'ufo'

const props = defineProps({
  path: {
    type: String,
    default: 'galeri',
  },
})

const selectedTool = ref({ name: 'All Tools', icon: '' })

const { data: _galeri } = await useAsyncData('galeri', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const galeris = computed(() => {
  if (selectedTool.value.name === 'All Tools') {
    return _galeri.value || []
  }
  return (_galeri.value || []).filter(galeri => galeri.tools.map(tool => tool.name).includes(selectedTool.value.name))
})

const allTools = computed(() => {
  const tools = new Map()
  _galeri.value.forEach((galeri) => {
    galeri.tools.forEach(tool => tools.set(tool.name, tool))
  })
  return [{ name: 'All Tools', icon: 'i-ph-sort-ascending-duotone' }, ...Array.from(tools.values())]
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
      <div class="flex pt-4 justify-end">
        <USelectMenu
          v-model="selectedTool"
          class="w-60  "
          :options="allTools"
          placeholder="Pilih tool"
          @select="selectedTool = $event"
        >
          <template #label>
            <UIcon
              v-if="selectedTool.icon"
              :name="selectedTool.icon"
              class="w-5 h-5 mr-2"
            />
            <span class="truncate">{{ selectedTool.name }}</span>
          </template>

          <template #option="{ option: selectedTool }">
            <UIcon
              :name="selectedTool.icon"
              class="w-5 h-5 mr-2"
            />
            <span class="truncate">{{ selectedTool.name }}</span>
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
