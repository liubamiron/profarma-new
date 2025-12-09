<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <!-- TOP BAR (Desktop only) -->
    <div class="bg-[#053258] text-white text-sm py-4 hidden md:block">
      <UContainer class="flex items-center justify-between px-0">
        <!-- Left -->
        <nav class="flex items-center gap-4 opacity-90">
          <NuxtLink to="/delivery" class="hover:opacity-100 transition">Delivery</NuxtLink>
          <span>|</span>
          <NuxtLink to="/return" class="hover:opacity-100 transition">Return</NuxtLink>
          <span>|</span>
          <NuxtLink to="/how-to-buy" class="hover:opacity-100 transition">How to buy</NuxtLink>
        </nav>

        <!-- Right -->
        <nav class="flex items-center gap-6 opacity-90">
          <NuxtLink to="/drugs-a-z" class="flex items-center gap-1 hover:opacity-100 transition">
            <UIcon name="i-mdi-text-box-search-outline" class="text-[#00c49a]" />
            A-Z Drugs
          </NuxtLink>

          <NuxtLink to="/faq" class="flex items-center gap-1 hover:opacity-100 transition">
            <UIcon name="i-mdi-help-circle-outline" />
            FAQ
          </NuxtLink>

          <NuxtLink to="/how-it-works" class="flex items-center gap-1 hover:opacity-100 transition">
            <UIcon name="i-mdi-monitor-dashboard" />
            How it Works
          </NuxtLink>

          <NuxtLink to="/contact" class="flex items-center gap-1 hover:opacity-100 transition">
            <UIcon name="i-mdi-phone-in-talk-outline" />
            Contact Us
          </NuxtLink>
        </nav>
      </UContainer>
    </div>

    <!-- MAIN HEADER -->
    <UContainer class="py-4">
      <!-- MOBILE ROW 1: hamburger + logo + cart -->
      <div class="flex items-center justify-between md:hidden mb-3">
        <!-- Hamburger -->
        <UButton
            color="secondary"
            variant="ghost"
            @click="mobileMenu = !mobileMenu"
            class="text-3xl text-[#053258]"
        >
          <UIcon name="i-mdi-menu" />
        </UButton>

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img src="/img/common/logo_desk_head.png" class="h-auto max-w-[170px]" alt="ProfarmaExpress" />
        </NuxtLink>

        <!-- Cart -->
        <NuxtLink to="/cart" class="flex items-center text-[#06396a]">
          <UIcon name="i-mdi-cart-outline" class="text-3xl text-[#00c49a]" />
        </NuxtLink>
      </div>
      <!-- MOBILE ROW 2: search -->
      <div class="md:hidden mb-4">
        <div class="relative w-full">
          <input
              ref="mobileTextRef"
              v-model="search"
              @input="doSearch"
              placeholder="Search a drug..."
              class="w-full bg-[#f4f7f7] rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none border border-transparent focus:border-[#00c49a]"
          />

          <!-- Clear button -->
          <button
              v-if="search"
              @click="clearMobileSearch"
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            ✕
          </button>

          <!-- Dropdown -->
          <ClientOnly>
            <ul
                v-if="search && results.length"
                class="absolute bg-white border rounded w-full mt-1 p-4 shadow-lg z-50"
            >
              <li
                  v-for="item in results"
                  :key="item.id"
                  class="p-2 hover:bg-gray-100"
              >
                <NuxtLink :to="`/product/${item.slug}`">{{ item.title }}</NuxtLink>
              </li>
            </ul>
            <p v-else-if="search && !results.length" class="absolute bg-white border rounded w-full mt-1 p-2">
              No results
            </p>
          </ClientOnly>

          <UIcon
              name="i-mdi-magnify"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[#00c49a] text-xl"
          />
        </div>
      </div>

      <!-- DESKTOP HEADER -->
      <div class="hidden md:flex items-center flex-row justify-between  gap-12">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/img/common/logo_desk_head.png" class="h-auto w-[220px]" alt="ProfarmaExpress" />
        </NuxtLink>

        <!-- Support -->
        <div class="hidden lg:flex items-center gap-2 text-[#06396a] whitespace-nowrap">
          <UIcon name="i-mdi-headset" class="text-[#00c49a] text-2xl" />
          <div>
            <div class="text-xs text-gray-500">Client Support</div>
            <div class="font-semibold">(855) 770-1077</div>
          </div>
        </div>

        <!-- Search -->
        <div class="flex-1">
          <div class="relative w-full">
            <input
                ref="textRef"
                v-model="search"
                @input="doSearch"
                placeholder="Type your drug name (Atorvastatin, Sildenafil...)"
                class="w-full bg-[#f4f7f7] rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none focus:border-[#00c49a]"
            />

            <!-- Clear button -->
            <button
                v-if="search"
                @click="clearSearch"
                type="button"
                class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500"
            >
              ✕
            </button>

            <!-- Dropdown -->
            <ClientOnly>
              <ul
                  v-if="search && results.length"
                  class="absolute bg-white w-full mt-1 shadow-lg p-4 z-50"
              >
                <li
                    v-for="item in results"
                    :key="item.id"
                    class="p-2 hover:bg-gray-100"
                >
                  <NuxtLink :to="`/product/${item.slug}`">{{ item.title }}</NuxtLink>
                </li>
              </ul>
              <p v-else-if="search && !results.length" class="absolute bg-white  w-full mt-1 p-2">
                No results
              </p>
            </ClientOnly>

            <UIcon
                name="i-mdi-magnify"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#00c49a] text-xl"
            />
          </div>
        </div>

        <!-- Cart -->
        <NuxtLink
            to="/cart"
            class="flex items-center gap-1 text-[#06396a] font-medium hover:text-[#00c49a] transition"
        >
          <UIcon name="i-mdi-cart-outline" class="text-2xl text-[#00c49a]" />
          Cart
          <UIcon name="i-mdi-chevron-down" />
        </NuxtLink>
      </div>
    </UContainer>

    <!-- MOBILE DROPDOWN MENU -->
    <div
        v-if="mobileMenu"
        class="md:hidden bg-white border-t shadow-md animate-fade-in"
    >
      <div class="p-5 space-y-4 text-lg">
        <NuxtLink to="/delivery" class="block py-2">Delivery</NuxtLink>
        <NuxtLink to="/return" class="block py-2">Return</NuxtLink>
        <NuxtLink to="/how-to-buy" class="block py-2">How to buy</NuxtLink>
        <NuxtLink to="/drugs-a-z" class="block py-2">A-Z Drugs</NuxtLink>
        <NuxtLink to="/faq" class="block py-2">FAQ</NuxtLink>
        <NuxtLink to="/how-it-works" class="block py-2">How it Works</NuxtLink>
        <NuxtLink to="/contact" class="block py-2">Contact Us</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {IProductMin} from "~/types/core";
import { useMainStore } from '~/stores/main'

const mobileMenu = ref(false)
const search = ref('')

const results = ref<IProductMin[]>([])
const textRef = ref<HTMLInputElement>()
const mobileTextRef = ref<HTMLInputElement>()
const searchStore = useMainStore()

// Search as user types
const doSearch = async () => {
  if (search.value.length > 1) {
    results.value = await searchStore.search(search.value)
  } else {
    results.value = []
  }
}

// Clear input
const clearSearch = () => {
  search.value = ''
  results.value = []
  textRef.value?.focus()
}

const clearMobileSearch = () => {
  search.value = ''
  results.value = []
  mobileTextRef.value?.focus()
}
</script>
