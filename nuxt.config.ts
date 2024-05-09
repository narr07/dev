// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/seo',
  ],
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
  site: {
    url: 'https://permadi.dev',
    name: 'Website Dinar Permadi Yusup',
    description: 'Welcome to my awesome site!',
    defaultLocale: 'id', // not needed if you have @nuxtjs/i18n installed
  },
  ui: {
    global: true,
    icons: ['ph', 'skill-icons'],
  },
  fonts: {
    families: [
      { name: 'Rubik',
        provider: 'google',
      },
      { name: 'Space Grotesk', provider: 'google' },
    ],
    fallbacks: {
      'serif': ['Times New Roman'],
      'sans-serif': ['Arial'],
      'monospace': ['Courier New'],

    },
    defaults: {

      preload: true,
      styles: ['normal', 'italic'],
      subsets: [
        'cyrillic-ext',
        'cyrillic',
        'greek-ext',
        'greek',
        'vietnamese',
        'latin-ext',
        'latin',
      ],
    },

    assets: {
      prefix: '/_fonts',
    },
  },
})
