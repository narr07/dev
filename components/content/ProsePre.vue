<template>
  <ProseCode
    :code="code"
    :language="language"
    :filename="filename"
    :highlights="highlights"
    :meta="meta"
  >
    <UCard
      :ui="{
        background: 'bg-primary-300 dark:bg-permadi-800',
        base: {
          padding: 'sm:mt-0 mt-0 ',
        },
        header: {
          padding: 'sm:px-2 px-2 py-1  sm:py-1  m-0',
        },
        body: {
          background: 'bg-permadi-700 dark:bg-primary-950 ',
          padding: 'sm:px-0 px-0 py-0 p-0  m-0 sm:my-0 sm:m-0 sm:py-0 sm:p-0',
        },
      }"
    >
      <template #header>
        <div class="justify-between  flex items-center">
          <div

            class="font-mono text-[12px]"
          >
            {{ filename }}
          </div>

          <div class="flex justify-end">
            <UButton
              color="primary"
              variant="ghost"
              aria-label="Theme"
              gap="xs"
              square
              
            >
              <UIcon
                class="w-4 h-4"
                :name="copied ? 'i-ph-check-square-duotone' : 'i-ph-copy-duotone'"
                dynamic
                @click="copy(code); toast.add({ title: 'Berhasil di Salin', icon: 'i-ph-check-fat-duotone', timeout: 1500 })"
              />
            </UButton>
          </div>
        </div>
      </template>

      <pre
        :class="$props.class"
        class="-mt-1 sm:-mt-1 md:-mt-1 lg:-mt-1 bg-black bg-opacity-0"
        :style="style"
      ><slot /></pre>
    </UCard>
  </ProseCode>
</template>

<script setup lang="ts">
const { copy, copied } = useClipboard()
const toast = useToast()

defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  style: {
    type: [String, Object],
    default: null,
  },
})
</script>

<style scoped>
pre code .line {
  display: block;
  min-height: 0;
}
</style>
