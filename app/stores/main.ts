import { defineStore } from 'pinia'
import { useRuntimeConfig, useNuxtApp } from '#imports'
// import {ICartItem} from "../types/core";
import type { IBlock, ICartItem, IHistory, IObject } from '../types/core'

interface ISite {
  blocks: IBlock[]
}

interface IState extends IObject<any> {
  site: ISite | null
}

export const useMainStore = defineStore('main', {
  state: (): IState => ({
    site: null,
  }),

  getters: {
    'history.saving': () => {
      const { isClient } = useNuxtApp()
      return isClient ? JSON.parse(localStorage.getItem('history-saving') ?? 'true') : true
    },
    block: (state) => {
      return (slug: string): IBlock | undefined =>
        state.site?.blocks.find(item => item.slug === slug)
    }
  },

  actions: {
    privateApiHost(): string {
      const config = useRuntimeConfig()
      return config.public.apiHost
    },

    async load(uri: string, key: string | null = null) {
      if (key && this[key] !== undefined && this[key] !== null) return this[key]

      const host = this.privateApiHost()
      const result = await fetch(host + uri)
        .then(res => res.json())
        .then(res => {
          if (!res.success) return null
          if (key) this[key] = res.data
          return res.data
        })
        .catch(err => {
          console.error(err)
          return null
        })

      if (key) this[key] = result
      return result
    },

    async request(uri: string, data: any, method: string = 'POST') {
      const host = this.privateApiHost()
      return fetch(host + uri, {
        method,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) return res.data
          throw res.errors
        })
    },

    async page(slug: string) { return this.load('/page/' + slug) },
    // async top() {
    //     const key = 'top' // cache key for top products
    //     const result = await this.load('/product/top?expand=form', key)
    //     return result ?? [] // always return an array
    // },

    async top() {
      return this.load('/product/top?expand=form', 'topProducts')
    },

    // async samples() { return this.load('/product/samples?expand=image,price', 'samples') },
    async site() { return this.load('/site', 'site') },
    // async about() { return this.load('/about?expand=image', 'about') },
    // async faq() { return this.load('/faq', 'faq') },
    // async listing(letter: string) { return this.load('/product/listing?letter=' + letter, 'listing' + (letter ? '-' + letter : '')) },
    async product(slug: string) { return this.load('/product/' + slug + '?expand=prices,images,image,original,products') },
    // async additional(slug: string) { return this.load('/product/' + slug + '/additional') },
    async search(query: string) { return this.load('/product/search?s=' + query) },
    // async order(payload: any) { return this.request('/product/order', payload) },
    // async contact(payload: any) { return this.request('/site/contact', payload) },
    // async subscribe(payload: any) { return this.request('/subscribe/subscribe', payload) },

    getHistory(): IHistory[] {
      const { isClient } = useNuxtApp()
      return isClient ? JSON.parse(localStorage.getItem('history') ?? '[]') : []
    },

    clearHistory() {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      localStorage.removeItem('history')
    },

    removeHistory(productId: number) {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      const history: IHistory[] = JSON.parse(localStorage.getItem('history') ?? '[]')
      const filtered = history.filter(h => h.product.id !== productId)
      localStorage.setItem('history', JSON.stringify(filtered))
    },

    addToCart(item: ICartItem) {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      const items: ICartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]')
      const exists = items.find(i => i.product.id === item.product.id)
      if (!exists) items.unshift(item)
      localStorage.setItem('cart', JSON.stringify(items.slice(0, 5)))
    },

    updateCart(item: ICartItem) {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      const items: ICartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]')
      const index = items.findIndex(i => i.product.id === item.product.id)
      if (index > -1) items[index] = { ...items[index], ...item }
      localStorage.setItem('cart', JSON.stringify(items))
    },

    removeCart(item: ICartItem) {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      const items: ICartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]')
      const filtered = items.filter(i => i.product.id !== item.product.id)
      localStorage.setItem('cart', JSON.stringify(filtered))
    },

    clearCart() {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      localStorage.removeItem('cart')
    },

    set(key: string, data: any) {
      this[key] = data
    },

    async saveHistoryFlag(payload: boolean) {
      const { isClient } = useNuxtApp()
      if (!isClient) return
      if (!payload) localStorage.removeItem('history')
      localStorage.setItem('history-saving', JSON.stringify(payload))
    }
  }
})
