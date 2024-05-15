<script setup lang="ts">
import SvgDesigner from './SvgDesigner.vue'
import SvgGuru from './SvgGuru.vue'
import SvgProgrammer from './SvgProgrammer.vue'

const designIcon = ref([
  { title: 'Illustrator', iconName: 'i-logos-adobe-illustrator', url: 'https://illustrator.example.com' },
  { title: 'Photoshop', iconName: 'i-logos-adobe-photoshop', url: 'https://illustrator.example.com' },
  { title: 'Figma', iconName: 'i-skill-icons-figma-dark', url: 'https://figma.example.com' },
  { title: 'XD', iconName: 'i-logos-adobe-xd', url: 'https://illustrator.example.com' },
  { title: 'Premiere', iconName: 'i-logos-adobe-premiere', url: 'https://illustrator.example.com' },
  { title: 'After Effect', iconName: 'i-logos-adobe-after-effects', url: 'https://illustrator.example.com' },
  { title: 'Lightroom', iconName: 'i-logos-adobe-lightroom', url: 'https://illustrator.example.com' },
  { title: 'Animate', iconName: 'i-logos-adobe-animate', url: 'https://illustrator.example.com' },
  { title: 'Affinity Designer', iconName: 'i-vscode-icons-file-type-affinitydesigner', url: 'https://illustrator.example.com' },
  { title: 'Corel Draw', iconName: 'i-file-icons-coreldraw-alt', url: 'https://illustrator.example.com' },
  { title: 'SketchUp', iconName: 'i-skill-icons-sketchup-dark', url: 'https://sketchup.example.com' },
  { title: 'Blender', iconName: 'i-skill-icons-blender-dark', url: 'https://figma.example.com' },
  { title: 'Gimp', iconName: 'i-devicon-gimp', url: 'https://figma.example.com' },
  { title: 'InkScape', iconName: 'i-devicon-inkscape', url: 'https://figma.example.com' },
  { title: 'Sketch', iconName: 'i-devicon-sketch', url: 'https://figma.example.com' },
  { title: 'Canva', iconName: 'i-devicon-canva', url: 'https://figma.example.com' },

  { title: 'InCoppy', iconName: 'i-logos-adobe-incopy', url: 'https://illustrator.example.com' },
  { title: 'InDesign', iconName: 'i-logos-adobe-indesign', url: 'https://illustrator.example.com' },
])
const techIcons = [
  { title: 'Python', iconName: 'i-skill-icons-python-dark', url: 'https://illustrator.example.com' },
  { title: 'Laravel', iconName: 'i-skill-icons-nuxtjs-dark', url: 'https://illustrator.example.com' },
  { title: 'Flutter', iconName: 'i-skill-icons-flutter-dark', url: 'https://illustrator.example.com' },
  { title: 'Laravel', iconName: 'i-skill-icons-tailwindcss-dark', url: 'https://illustrator.example.com' },
  { title: 'Laravel', iconName: 'i-skill-icons-nextjs-dark', url: 'https://illustrator.example.com' },
  { title: 'Javascript', iconName: 'i-skill-icons-javascript', url: 'https://illustrator.example.com' },
  { title: 'Dart', iconName: 'i-skill-icons-dart-dark', url: 'https://illustrator.example.com' },
  { title: 'Laravel', iconName: 'i-skill-icons-python-dark', url: 'https://illustrator.example.com' },
  { title: 'Flask', iconName: 'i-skill-icons-flask-dark', url: 'https://illustrator.example.com' },
  { title: 'Django', iconName: 'i-skill-icons-django', url: 'https://illustrator.example.com' },
  { title: 'Vue', iconName: 'i-skill-icons-vuejs-dark', url: 'https://illustrator.example.com' },
  { title: 'PHP', iconName: 'i-skill-icons-php-dark', url: 'https://illustrator.example.com' },
  { title: 'Laravel', iconName: 'i-skill-icons-laravel-dark', url: 'https://illustrator.example.com' },
  { title: 'React', iconName: 'i-skill-icons-react-dark', url: 'https://illustrator.example.com' },
  { title: 'Git', iconName: 'i-skill-icons-git', url: 'https://illustrator.example.com' },
  { title: 'Supabase', iconName: 'i-skill-icons-supabase-dark', url: 'https://illustrator.example.com' },
  { title: 'Typescript', iconName: 'i-skill-icons-typescript', url: 'https://illustrator.example.com' },
  { title: 'Vercel', iconName: 'i-skill-icons-vercel-dark', url: 'https://illustrator.example.com' },
]

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
  <UContainer class="pt-10 md:pt-16">
    <div class="grid h-full w-full md:grid-cols-2  gap-4">
      <!-- corousel -->

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

      <!-- tab -->

      <UTabs
        class="h-full flex flex-col"
        :items="tabitems"
      >
        <!-- tombol tab -->
        <template #default="{ item }">
          <div class="flex items-center gap-1 relative truncate">
            <UIcon
              :name="item.icon"
              class="w-3 h-3 md:w-4 md:h-4  flex-shrink-0"
            />
            <span class="text-xs md:text-sm">
              {{ item.label }}
            </span>
          </div>
        </template>
        <!-- konten tab 1 -->
        <template #user>
          <UCard class="my-auto flex-grow h-full p-2">
            <p>
              Saya <span class="text-permadi-950 dark:text-yellow font-bold">
                Dinar Permadi Yusup,
              </span>
              Seorang guru SD yang menguasai bidang desain grafis dan pemograman. Saya memiliki keahlian dalam desain grafis dan menguasai beberapa bahasa pemrograman. Melalui website ini, Saya
              ingin berbagi pengetahuan dalam  belajar desain dan pemrograman. Saya lulusan Universitas Pendidikan Indonesia (UPI) dan saat ini bekerja sebagai guru di SDN Teja II
            </p>
          </UCard>
        </template>

        <!-- konten tab 2 -->
        <template #desain>
          <UCard class=" flex-grow h-full">
            <div class="  items-center  ">
              <div class="flex flex-wrap gap-2 md:gap-4 justify-center ">
                <div
                  v-for="(button, index) in designIcon"
                  :key="index"
                >
                  <UTooltip
                    :text="button.title"
                    placement="bottom"
                    :popper="{ arrow: true }"
                  >
                    <UButton
                      class="px-1.5"
                      color="gray"
                      variant="ghost"
                      :to="button.url"
                      target="_blank"
                      :title="button.title"
                      :aria-label="button.title"
                      rel="noopener noreferrer nofollow"
                    >
                      <UIcon
                        class="w-10 h-10"
                        :name="button.iconName"
                      />
                      <span class="visually-hidden">{{ button.title }}</span>
                    </UButton>
                  </UTooltip>
                </div>
              </div>
            </div>
          </UCard>
        </template>

        <!-- konten tab 3 -->
        <template #teknologi>
          <UCard class=" flex-grow h-full">
            <div class="  items-center  ">
              <div class="flex flex-wrap gap-2 md:gap-4 justify-center ">
                <div
                  v-for="(techIcon, index) in techIcons"
                  :key="index"
                >
                  <UTooltip
                    :text="techIcon.title"
                    placement="bottom"
                    :popper="{ arrow: true }"
                  >
                    <UButton
                      class="px-1.5"
                      color="gray"
                      variant="ghost"
                      :to="techIcon.url"
                      target="_blank"
                      :aria-label="techIcon.title"
                      :title="techIcon.title"
                      rel="noopener noreferrer nofollow"
                    >
                      <UIcon
                        class="w-10 h-10"
                        :name="techIcon.iconName"
                      /> <span class="visually-hidden">{{ techIcon.title }}</span>
                    </UButton>
                  </UTooltip>
                </div>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
