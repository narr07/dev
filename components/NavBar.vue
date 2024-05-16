<script lang="ts" setup>


// Gunakan useScroll dari VueUse
const { y } = useScroll(window)

// Buat ref untuk mengelola state scroll
const isScrollingUp = ref(true)
let lastScrollPosition = 0

// Pantau perubahan posisi scroll
watch(y, (newY) => {
  isScrollingUp.value = newY < lastScrollPosition
  lastScrollPosition = newY
})
</script>

<template>
  <!-- ========== HEADER ========== -->
  <div>
    <div :class="['fixed top-2 z-50 w-full transition-transform duration-500', isScrollingUp ? 'transform-none' : '-translate-y-32']">
      <UContainer>
        <UCard>
          <div class="flex justify-between items-center flex-row">
            <UTooltip text="Home" placement="bottom" :popper="{ arrow: true }">
              <ULink aria-label="logo" to="/">
                <Logo />
              </ULink>
            </UTooltip>
            <div class="flex">
              <div>
                <ContentNavigation v-slot="{ navigation }">
                  <ul class="flex md:space-x-2">
                    <li v-for="link of navigation" :key="link._path">
                      <UTooltip :text="link.title" placement="bottom" :popper="{ arrow: true }">
                        <UButton
                          square
                          role="link"
                          :title="link.title"
                          :aria-label="link.title"
                          rel="noopener noreferrer"
                          class="uppercase"
                          :icon="link.icon"
                          color="gray"
                          :variant="$route.path === link._path ? 'solid' : 'ghost'"
                          :to="link._path"
                        >
                          <div class="hidden md:block">{{ link.title }}</div>
                        </UButton>
                      </UTooltip>
                    </li>
                  </ul>
                  <div />
                </ContentNavigation>
              </div>
            </div>
            <div class="flex">
              <DocsSearchButton />
              <ColorMode />
            </div>
          </div>
        </UCard>
      </UContainer>
    </div>
  </div>
  <!-- ========== END HEADER ========== -->
</template>

<style scoped>
.fixed-top {
  top: 0; /* Adjust this value as needed */
  transition: transform 0.2s ease-in-out;
}
</style>
