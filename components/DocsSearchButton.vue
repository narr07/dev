<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const isOpen = ref(false)

const router = useRouter()
const commandPaletteRef = ref()

const { data: files } = await useLazyAsyncData('search', () => queryContent().where({ _type: 'markdown' }).find(), { default: () => [] })

const defaultGroups = computed(() => files.value.map(file => ({
  id: file._id,
  title: file.title,
  to: file._path,
  suffix: file.description,
  icon: file.icon,
})))

const queryGroups = computed(() => files.value.flatMap((file) => {
  return [{
    id: file._id,
    title: file.title,
    to: file._path,
    description: file.description,
    icon: file.icon,
  },

  // @ts-expect-error broken
  ...Object.entries(groupByHeading(file.body.children)).map(([hash, { title, children }]) => ({
    id: `${file._path}${hash}`,
    title,
    prefix: `${file.title} ->`,
    prefixClass: 'text-gray-700 dark:text-gray-200',
    to: `${file._path}${hash}`,
    children: concatChildren(children),
    icon: file.icon,
  }))]
}))
const groups = computed(() =>
  [commandPaletteRef.value?.query
    ? {
        key: 'queryGroups',
        commands: queryGroups.value,
      }
    : {
        key: 'defaultGroups',
        commands: defaultGroups.value,
      }].filter(Boolean))
// const groups = computed(() => commandPaletteRef.value?.query ? queryGroups.value : defaultGroups.value)

function remapChildren(children: any[]) {
  return children?.map((grandChild) => {
    if (['code-inline', 'em', 'a', 'strong'].includes(grandChild.tag))
      return { type: 'text', value: grandChild.children.find((child: any) => child.type === 'text')?.value || '' }

    return grandChild
  })
}

function concatChildren(children: any[]) {
  return children.map((child: any) => {
    if (['alert'].includes(child.tag))
      child.children = concatChildren(child.children)

    if (child.tag === 'p') {
      child.children = remapChildren(child.children)

      child.children = child.children?.reduce((acc: any[], grandChild: any) => {
        if (grandChild.type === 'text') {
          if (acc.length && acc[acc.length - 1].type === 'text')
            acc[acc.length - 1].value += grandChild.value
          else
            acc.push(grandChild)
        }
        else {
          acc.push(grandChild)
        }
        return acc
      }, [])
    }
    if (['style'].includes(child.tag))
      return null

    return child
  })
}
function groupByHeading(children: any[]) {
  const groups: { [key: string]: { children: any[], title: string | null } } = {} // grouped by path
  let hash = '' // file.page with potential `#anchor` concat
  let title: string | null = null
  for (const node of children) {
    // if heading found, udpate current path
    if (['h2', 'h3'].includes(node.tag)) {
      // find heading text value
      title = node.children?.find((child: any) => child.type === 'text')?.value
      if (title)
        hash = `#${node.props.id}`
    }
    // push to existing/new group based on path
    if (groups[hash])
      groups[hash].children.push(node)
    else
      groups[hash] = { children: [node], title }
  }
  return groups
}

function onSelect(option: any) {
  if (option.click)
    option.click()
  else if (option.to)
    router.push(option.to)
  else if (option.href)
    window.open(option.href, '_blank')
}
</script>

<template>
  <div>
    <UTooltip
      text="Pencarian"
      placement="bottom"
      :popper="{ arrow: true }"
    >
      <UButton
        aria-label="Buka pencarian"
        icon="i-ph-magnifying-glass-duotone"
        color="gray"
        variant="ghost"
        @click="isOpen = true"
      />
    </UTooltip>
    <UModal
      v-model="isOpen"
      :ui="{

        container: 'flex min-h-full items-start sm:items-start justify-center text-center',

        margin: 'sm:my-8',
        base: 'relative text-left rtl:text-right overflow-hidden flex flex-col',
        padding: 'sm:p-4',
        rounded: 'sm:rounded-lg',
        width: 'sm:max-w-3xl',
        height: 'h-[400px]',
      }"
    >
      <!-- <pre> {{ queryGroups }}</pre> -->
      <UCommandPalette
        placeholder="Cari..."
        command-attribute="title"
        :groups="groups"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'ghost', size: 'sm' }"

        :fuse="{
          fuseOptions: {
            ignoreLocation: true,
            includeMatches: true,
            threshold: 0,

            keys: ['title', 'description', 'children.children.value', 'children.children.children.value'],
          },
          resultLimit: 10,
        }"

        @update:model-value="onSelect"
        @click="isOpen = false"
      />
    </UModal>
  </div>
</template>
