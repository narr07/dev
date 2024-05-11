<script lang="ts" setup></script>

<template>
  <!-- ========== HEADER ========== -->
  <div>
    <div class="fixed top-2 z-50 w-full">
      <UContainer>
        <UCard>
          <div class="flex justify-between items-center flex-row">
            <ULink to="/">
              <Logo /></ULink>
            <div class="flex">
              <div>
                <ContentNavigation v-slot="{ navigation }">
                  <ul class="flex space-x-2">
                    <li
                      v-for="link of navigation"
                      :key="link._path"
                    >
                      <UTooltip
                        :text="link.title"
                        placement="bottom"
                        popper="{ arrow: true }"
                      >
                        <UButton
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
                        />
                      </UTooltip>
                    </li>
                  </ul>
                  <div />
                </ContentNavigation>
              </div>
            </div>
            <div>
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
