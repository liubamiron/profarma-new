<template>
  <div class="home-page">
    <UContainer class="py-12 flex flex-col gap-10 md:px-0 px-4">
      <!-- HERO TITLE -->
      <div class="text-[34px] md:text-[58px] font-bold text-white leading-tight md:leading-snug">
        SAME PILLS.<br>
        LOWER <br>
        PRICES.
      </div>

      <!-- DIVIDER -->
      <div class="border-t-2 border-dashed w-[10%] md:mb-20 mb-0" />

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
              placeholder="Type your drug name (Atorvastatin, Sildenafil...)"
              class="w-full bg-[#f4f7f7] rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none"
              @input="doSearch"
            >

            <button
              v-if="search"
              type="button"
              class="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500"
              @click="clearSearch"
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

              <p
                v-else-if="search && !results.length"
                class="absolute bg-white w-full mt-1 p-2"
              >
                No results
              </p>
            </ClientOnly>

            <UIcon
              name="i-mdi-magnify"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-green-pharma text-xl"
            />
          </div>
          <div class="text-sm md:mt-2 mt-[-10%]">
            Popular searches: Atorvastatin, Sildenafil, Zoloft, Lexapro...
          </div>
        </div>

        <!-- RIGHT COLUMN (Desktop: Description + Steps side-by-side) -->
        <div class="flex flex-col w-full md:w-1/2 gap-10 mt-auto">
          <!-- STEPS -->
          <div class="flex flex-col md:flex-row gap-10 md:mt-0 mt-[480px]">
            <!-- STEP 1 -->
            <div class="flex items-center">
              <div class="flex items-center justify-center rounded-full bg-green mr-4 shrink-0">
                <svg class="svg-sprite-icon icon-contract fill-white w-[50px]">
                  <use xlink:href="/img/sprite/symbol/sprite.svg#contract" />
                </svg>
              </div>
              <p class="font-bold uppercase text-white leading-6">
                Licensed<br>
                wholesale<br>
                medical supplier
              </p>
            </div>

            <!-- DIVIDER (desktop only) -->
            <div class="hidden md:block h-24 border-l-2 border-dashed border-white" />

            <!-- STEP 2 -->
            <div class="flex items-center">
              <div class="flex items-center justify-center rounded-full bg-green mr-4 shrink-0">
                <svg class="svg-sprite-icon icon-air-plane fill-white w-[50px]">
                  <use xlink:href="/img/sprite/symbol/sprite.svg#air-plane" />
                </svg>
              </div>
              <p class="font-bold uppercase text-white leading-6">
                FREE SHIPPING
                FROM $200<br>
                ORDER
              </p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
  <TopBlock class="mt-[-32px] mb-[40px]" />

  <UContainer class="m-auto flex flex-col md:flex-col justify-between">
    <!-- Mobile: Text above image -->
    <div class="md:hidden mb-6">
      <div class="text-right text-[19px] uppercase leading-none">
        <p class="font-extrabold text-green-pharma text-[60px]">
          Save
        </p>
        <div class="flex flex-row justify-end">
          <p class="font-extrabold text-green-pharma text-[20px] mt-4 mr-1">
            <span class="align-top">up</span><br>
            to
          </p>
          <p class="font-extrabold text-green-pharma text-[80px]">
            80%
          </p>
        </div>
        <p class="font-extrabold text-blue-pharma text-[40px]">
          on drugs
        </p>
        <p class="text-[20px] font-bold mt-10 text-right">
          Order medications
        </p>
        <p class="text-[18px] font-bold text-right">
          from Europe, cheaper
        </p>
        <p class="text-[18px] font-bold text-right">
          than Canada
        </p>
      </div>
    </div>

    <!-- Image container -->
    <div class="bg_map md:w-full h-[300px] md:h-[700px] w-[400px] bg-contain bg-center bg-no-repeat relative">
      <!-- Desktop blocks: only show on md+ -->
      <div class="hidden md:flex flex-col justify-between h-full">
        <!-- TOP ROW: Right corner -->
        <div class="flex justify-end p-6">
          <div class="text-right text-[19px] uppercase leading-none">
            <p class="font-extrabold text-green-pharma text-[60px]">
              Save
            </p>
            <div class="flex flex-row justify-end">
              <p class="font-extrabold text-green-pharma text-[20px] m-auto">
                <span class="align-top">up</span><br>
                to
              </p>
              <p class="font-extrabold text-green-pharma text-[80px]">
                80%
              </p>
            </div>
            <p class="font-extrabold text-blue-pharma text-[40px]">
              on drugs
            </p>
            <p class="text-[20px] font-bold mt-10 text-right">
              Order medications
            </p>
            <p class="text-[18px] font-bold text-right">
              from Europe, cheaper
            </p>
            <p class="text-[18px] font-bold text-right">
              than Canada
            </p>
          </div>
        </div>

        <!-- BOTTOM ROW: Left corner -->
        <div class="flex justify-start p-6 w-[40%]">
          <div class="text-left text-[14px]">
            <blockquote class="border-l-2 border-green-pharma border-dotted pl-4">
              You can visit our physical locations to drop off your local pharmacy’s prescription or email your prescription to our professional support staff. Enjoy savings that will put a smile on your face.
              Our Licensed Wholesale medication department purchase drugs from original manufacturers and distributors in Europe. You can ask us to email you our verified copy of our government approved license in wholesale medication. Authentic brand medications or generic is our business, your health is our Priority.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile: Text under image -->
    <div class="md:hidden mt-6 block">
      <!-- BOTTOM ROW: Left corner text -->
      <div class="text-[14px]">
        <blockquote class="border-l-2 border-green-pharma border-dotted pl-4">
          You can visit our physical locations to drop off your local pharmacy’s prescription or email your prescription to our professional support staff. Enjoy savings that will put a smile on your face.
          Our Licensed Wholesale medication department purchase drugs from original manufacturers and distributors in Europe. You can ask us to email you our verified copy of our government approved license in wholesale medication. Authentic brand medications or generic is our business, your health is our Priority.
        </blockquote>
      </div>
    </div>
  </UContainer>

  <UContainer>
    <div class="m-auto text-center uppercase mt-20 text-3xl">
      How it works
    </div>

    <div class="m-auto max-w-[400px] mt-12 relative">
      <img
        src="/img/common/layer_how_it_works.png"
        alt="how_it_works"
        class="w-full h-auto"
      >

      <!-- Play icon centered over the image -->
      <a
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
        class="absolute inset-0 flex items-center justify-center top-0 bottom-10"
      >
        <svg class="svg-sprite-icon icon-play-button w-[50px] h-[50px] fill-gray-500">
          <use xlink:href="/img/sprite/symbol/sprite.svg#play-button" />
        </svg>
      </a>
    </div>

    <!-- Watch video button -->
    <a
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      class="flex items-center justify-center mx-auto mt-5 bg-white text-green-pharma px-6 py-2 rounded-full hover:bg-gray-100"
    >
      <svg class="svg-sprite-icon icon-play-button mr-2 w-[20px] h-[20px] fill-gray-400">
        <use xlink:href="/img/sprite/symbol/sprite.svg#play-button" />
      </svg>
      <span>Watch the video</span>
    </a>
  </UContainer>

  <UContainer class="py-16 bg-white">
    <div class="flex flex-col md:flex-row md:justify-between md:gap-10 items-center">
      <!-- STEP 1 -->
      <div class="flex flex-col items-center relative w-full md:w-1/3 mb-12 md:mb-0">
        <!-- Connecting line (left) -->
        <img
          src="/img/common/line_left.svg"
          alt=""
          class="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-px"
        >

        <!-- Circle + Icon -->
        <div class="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#e6ebeb] mb-4">
          <svg class="svg-sprite-icon w-15 h-15 fill-green-pharma">
            <use xlink:href="/img/sprite/symbol/sprite.svg#step_01" />
          </svg>
          <div class="absolute top-0 right-0 w-8 h-8 bg-blue-pharma rounded-full flex items-center justify-center">
            <span class="text-white font-bold">01</span>
          </div>
        </div>

        <!-- Text -->
        <div class="text-center max-w-xs">
          <p class="font-bold uppercase leading-5 mb-2">
            Search for Medications & Save
          </p>
          <div class="border-t-2 border-dashed border-gray-300 w-16 mx-auto my-2" />
          <p class="text-sm ">
            Easily find the medications you are looking for. We price match with an additional 10% discount.
          </p>
        </div>
      </div>

      <!-- STEP 2 -->
      <div class="flex flex-col items-center relative w-full md:w-1/3 mb-12 md:mb-0">
        <!-- Connecting line (right) -->
        <img
          src="/img/common/line_right.svg"
          alt=""
          class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-px"
        >

        <!-- Circle + Icon -->
        <div class="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#e6ebeb] mb-4">
          <svg class="svg-sprite-icon w-10 h-10 fill-green-pharma">
            <use xlink:href="/img/sprite/symbol/sprite.svg#step_02" />
          </svg>
          <div class="absolute bottom-0 left-0 w-8 h-8 bg-blue-pharma rounded-full flex items-center justify-center">
            <span class="text-white font-bold">02</span>
          </div>
        </div>

        <!-- Text -->
        <div class="text-center max-w-xs">
          <p class="font-bold uppercase leading-5 mb-2">
            Order Your Prescriptions
          </p>
          <div class="border-t-2 border-dashed border-gray-300 w-16 mx-auto my-2" />
          <p class="text-sm ">
            Place your order online or by phone with a prescription for your meds. Note: we do not ship or sell controlled substances.
          </p>
        </div>
      </div>

      <!-- STEP 3 -->
      <div class="flex flex-col items-center relative w-full md:w-1/3">
        <!-- Circle + Icon -->
        <div class="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#e6ebeb] mb-4">
          <!-- Icon inside gray circle -->
          <svg class="svg-sprite-icon w-10 h-10 fill-green-pharma">
            <use xlink:href="/img/sprite/symbol/sprite.svg#step_03" />
          </svg>

          <!-- Blue number circle -->
          <div class="absolute top-0 right-0 w-8 h-8 bg-blue-pharma rounded-full flex items-center justify-center">
            <span class="text-white font-bold">03</span>
          </div>
        </div>

        <!-- Text -->
        <div class="text-center max-w-xs">
          <p class="font-bold uppercase leading-5 mb-2">
            Free Shipping from $200
          </p>
          <div class="border-t-2 border-dashed border-gray-300 w-16 mx-auto my-2" />
          <p class="text-sm">
            Your prescriptions will arrive at the indicated address within 3-5 days once shipped.
          </p>
        </div>
      </div>
    </div>

    <!-- HOW IT WORKS BUTTON -->
    <NuxtLink
      to="/how-it-works"
      class="mt-10 inline-flex items-center justify-center mx-auto px-6 py-3 bg-green-pharma text-white font-bold rounded-full hover:bg-green-500 transition"
    >
      How it Works
      <svg class="svg-sprite-icon w-4 h-4 ml-2 fill-white">
        <use xlink:href="/img/sprite/symbol/sprite.svg#arrow_right" />
      </svg>
    </NuxtLink>
  </UContainer>
  <TopSavings />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IProductMin } from '~/types/core'
import { useMainStore } from '~/stores/main'

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

.bg-green {
  background-color: #00c49a;
  width: 97px;
  height: 97px;
}

.bg_map {
  background-image: url('/img/common/map_9669-1.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 700px;
}

.step__num {
  font-size: 1rem;
}

.border-dashed {
  border-style: dashed;
}

@media (max-width: 768px) {
  .home-page {
    background-image: url('/img/common/001-mob.png');
  }

  .bg_map {
    background-image: url('/img/common/plane_1255-1.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: calc(100% + 30px);
    margin-left: -15px;
    margin-right: -15px;
  }
}
</style>
