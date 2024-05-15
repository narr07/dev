<script lang="ts" setup>
import DocsSearchButton from './DocsSearchButton.vue'
</script>

<template>
  <!-- ========== HEADER ========== -->
  <div>
    <div class="fixed top-2 z-50 w-full">
      <UContainer>
        <UCard>
          <div class="flex justify-between items-center flex-row">
            <UTooltip
              text="Home"
              placement="bottom"
              :popper="{ arrow: true }"
            >
              <ULink
                aria-label="logo"
                to="/"
              >
                <Logo />
              </ULink>
            </UTooltip>
            <div class="flex">
              <div>
                <ContentNavigation v-slot="{ navigation }">
                  <ul class="flex md:space-x-2">
                    <li
                      v-for="link of navigation"
                      :key="link._path"
                    >
                      <UTooltip
                        :text="link.title"
                        placement="bottom"
                        :popper="{ arrow: true }"
                      >
                        <UButton
                          square
                          role="link"
                          :title="link.title"
                          :aria-label="link.title"
                          rel="noopener noreferrer"
                          class="uppercase"
                          :icon="link.icon"
                          color="gray"
                          :variant="
                            $route.path === link._path
                              ? 'solid'
                              : 'ghost'
                          "
                          :to="link._path"
                        >
                          <div class="hidden md:block">
                            {{ link.title }}
                          </div>
                        </UButton>
                      </UTooltip>
                    </li>
                  </ul>
                  <div />
                </ContentNavigation>
              </div>
            </div>
            <div class="flex  ">
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

<style scoped></style>
