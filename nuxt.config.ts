// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/device'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  vite: {
    optimizeDeps: {
      include: ['reka-ui']
    },
    build: {
      sourcemap: false,
      commonjsOptions: {
        include: [/reka-ui/, /node_modules/]
      }
    }
  },

  runtimeConfig: {
    public: {
      domain: process.env.DOMAIN || 'profarmaexpress.com',
      host: process.env.SCHEMA
        ? process.env.SCHEMA + '://' + (process.env.DOMAIN || 'profarmaexpress.com')
        : 'https://profarmaexpress.com',

      media: process.env.SCHEMA
        ? process.env.SCHEMA + '://api.' + (process.env.DOMAIN || 'profarmaexpress.com') + '/media'
        : 'https://api.profarmaexpress.com/media',

      apiHost: process.env.SCHEMA
        ? process.env.SCHEMA + '://api.' + (process.env.DOMAIN || 'profarmaexpress.com')
        : 'https://api.profarmaexpress.com'
    }
  }
})
