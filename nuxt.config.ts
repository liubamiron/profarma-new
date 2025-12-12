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
      domain: process.env.DOMAIN || 'activecaresupplies.techphproject.com/api',
      host: process.env.SCHEMA
        ? process.env.SCHEMA + '://' + (process.env.DOMAIN || 'api.activecaresupplies.techphproject.com/api')
        : 'https://activecaresupplies.techphproject.com/api',

      media: process.env.SCHEMA
        ? process.env.SCHEMA + '://' + (process.env.DOMAIN || 'activecaresupplies.techphproject.com/api/') + '/media'
        : 'https://activecaresupplies.techphproject.com/media/api',

      apiHost: process.env.SCHEMA
        ? process.env.SCHEMA + '://' + (process.env.DOMAIN || 'api.activecaresupplies.techphproject.com/api')
        : 'https://activecaresupplies.techphproject.com/api'
    }
  }
})
