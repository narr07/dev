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
    'nuxt-delay-hydration',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt', // needed
    '@pinia-plugin-persistedstate/nuxt',
  ],
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
  site: {
    url: 'https://dev-permadi.vercel.app/',
    name: 'Dinar Permadi Yusup',
    description: 'Dinar Permadi Yusup: Guru SD, Desainer Grafis, dan Programmer',
    defaultLocale: 'id', // not needed if you have @nuxtjs/i18n installed
    themeColor: '#2B6964',
  },
  colorMode: {
    preference: 'light',
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Dinar Permadi Yusup',
      url: 'https://permadi.dev',
      logo: 'https://permadi.dev/logo.png',
    },
  },
  ui: {
    global: true,
    icons: ['ph', 'skill-icons', 'devicon', 'logos', 'file-icons', 'vscode-icons'],
  },
  fonts: {
    families: [
      { name: 'Rubik',
        provider: 'google',
        weights: ['400', '700', '900'],
        subsets: ['latin'],
        display: 'swap',

      },
      { name: 'Space Grotesk',
        provider: 'google',
        display: 'swap',
      },
    ],
    defaults: {
      fallbacks: {
        'serif': ['Times New Roman'],
        'sans-serif': ['Arial'],
        'monospace': ['Courier New'],
      },
      preload: true,
      styles: ['normal', 'italic'],

    },
    assets: {
      prefix: '/_fonts',
    },
  },
  content: {
    documentDriven: true,
    navigation: {
      fields: ['navTitle'],
    },
    markdown: {
      anchorLinks: false,
    },
    highlight: {
      theme: {
        default: 'houston',
        dark: 'ayu-dark',
      },
      langs: [
        'json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini', 'c', 'cpp',
      ],
      preload: [
        'json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini', 'c', 'cpp',
      ],
    },
  },
  supabase: {
    redirect: false,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Products page generated on demand, revalidates in background, cached until API response changes
    // '/artikel': { isr: true },
    // '/galeri': { isr: true },
    // Product page generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
    // '/products/**': { swr: 3600 },
    // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    // '/blog': { isr: 3600 },
    // Blog post page generated on demand once until next deployment, cached on CDN
    '/artikel/**': { isr: true },
    '/galeri/**': { isr: true },
    // Admin dashboard renders only on client-side
    // '/admin/**': { ssr: false },
    // Add cors headers on API routes
    // '/api/**': { cors: true },
    // Redirects legacy urls
    // '/old-page': { redirect: '/new-page' }
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    // Downside: bigger JS bundle
    // With sync: 465KB, gzip: 204KB
    // Without: 418KB, gzip: 184KB
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },

  image: {

    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
  },

  delayHydration: {
    mode: 'mount',
  },
})
