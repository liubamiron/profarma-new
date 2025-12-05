<template>
  <div class="home-page">
    <UContainer class="py-12 flex flex-col gap-10 md:px-0 px-4">

      <!-- HERO TITLE -->
      <div class="text-[34px] md:text-[58px] font-bold text-white leading-tight md:leading-snug">
        SAME PILLS.<br/>
        LOWER <br/>
        PRICES.
      </div>

      <!-- DIVIDER -->
      <div class="border-t-2 border-dashed w-[10%] md:mb-20 mb-0"></div>

      <!-- DESKTOP GRID -->
      <div class="flex flex-col md:flex-row md:items-start md:gap-28">

        <!-- LEFT COLUMN (Search on desktop, Description on mobile BEFORE search) -->
        <div class="flex flex-col w-full md:w-1/2">

          <!-- DESCRIPTION (mobile before search, desktop after search) -->
          <div class="md:hidden mb-6">
            <p class="text-white text-sm leading-6">
              ProFarma Express is a Mail Order Prescription Medications Service. Drug prices vary
              significantly around the world, Europe being the cheapest, U.S. the highest. We are located in
              England, with affiliate offices in the United States. Our company is an authorized licensed
              online pharmacy and a wholesaler of branded and generic medications.
            </p>
          </div>

          <!-- SEARCH -->
          <div class="hidden md:block mt-10 mb-10 w-[80%]">
            <p class="text-white leading-6 text-sm">
              ProFarma Express is a Mail Order Prescription Medications Service. Drug prices vary
              significantly around the world, Europe being the cheapest, U.S. the highest. We are located in
              England, with affiliate offices in the United States. Our company is an authorized licensed
              online pharmacy and a wholesaler of branded and generic medications.
            </p>
          </div>
          <div class="relative mb-10 md:mb-0 w-[80%]">
            <input
              ref="textRef"
              v-model="search"
              @input="doSearch"
              placeholder="Type your drug name (Atorvastatin, Sildenafil...)"
              class="w-full bg-[#f4f7f7] rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none"
            />

            <button
              v-if="search"
              @click="clearSearch"
              type="button"
              class="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500"
            >
              ✕
            </button>

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

              <p v-else-if="search && !results.length" class="absolute bg-white w-full mt-1 p-2">
                No results
              </p>
            </ClientOnly>

            <UIcon
              name="i-mdi-magnify"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[#00c49a] text-xl"
            />
          </div>
          <div class="text-sm md:mt-2 mt-[-10%]">Popular searches: Atorvastatin, Sildenafil, Zoloft, Lexapro...</div>

        </div>

        <!-- RIGHT COLUMN (Desktop: Description + Steps side-by-side) -->
        <div class="flex flex-col w-full md:w-1/2 gap-10 mt-auto">

          <!-- STEPS -->
          <div class="flex flex-col md:flex-row gap-10 md:mt-0 mt-[480px]">

            <!-- STEP 1 -->
            <div class="flex items-center">
              <div class="flex items-center justify-center rounded-full bg-green mr-4 shrink-0">
                <svg class="svg-sprite-icon icon-contract fill-white w-[50px]">
                  <use xlink:href="/img/sprite/symbol/sprite.svg#contract"></use>
                </svg>
              </div>
              <p class="font-bold uppercase text-white leading-6">
                Licensed<br/>
                wholesale<br/>
                medical supplier
              </p>
            </div>

            <!-- DIVIDER (desktop only) -->
            <div class="hidden md:block h-24 border-l-2 border-dashed border-white"></div>

            <!-- STEP 2 -->
            <div class="flex items-center">
              <div class="flex items-center justify-center rounded-full bg-green mr-4 shrink-0">
                <svg class="svg-sprite-icon icon-air-plane fill-white w-[50px]">
                  <use xlink:href="/img/sprite/symbol/sprite.svg#air-plane"></use>
                </svg>
              </div>
              <p class="font-bold uppercase text-white leading-6">
                FREE SHIPPING
                FROM $200<br/>
                ORDER
              </p>
            </div>

          </div>

        </div>

      </div>
    </UContainer>
  </div>
  <TopBlock class="mt-[-32px]"/>

</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {IProductMin} from '~/types/core'
import {useMainStore} from '~/stores/main'

const search = ref('')
const results = ref<IProductMin[]>([])
const textRef = ref<HTMLInputElement>()
const searchStore = useMainStore()

const doSearch = async () => {
  if (search.value.length > 1) {
    results.value = await searchStore.search(search.value)
  } else {
    results.value = []
  }
}

const clearSearch = () => {
  search.value = ''
  results.value = []
  textRef.value?.focus()
}
</script>

<style scoped>
.home-page {
  background-image: url('/img/common/001.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

/* Mobile background */
@media (max-width: 768px) {
  .home-page {
    background-image: url('/img/common/001-mob.png');
  }
}

.bg-green {
  background-color: #00c49a;
  width: 97px;
  height: 97px;
}
</style>
