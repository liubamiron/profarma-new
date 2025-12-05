<template>
  <div>
    <UContainer class="bg-white shadow-sm p-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row gap-12">
        <div class="flex flex-col leading-none">

          <!-- TOP + ICON -->
          <div class="flex flex-row gap-1 leading-none">
            <span class="text-[40px] uppercase font-bold text-[#00c498] leading-none">
              Top
            </span>
            <svg class="svg-sprite-icon icon-top_20_arrow w-10 h-10 leading-none text-[#00c498]">
              <use xlink:href="/img/sprite/symbol/sprite.svg#top_20_arrow"></use>
            </svg>
          </div>

          <!-- BIG NUMBER -->
          <p class="text-[100px] font-bold text-[#00c498] leading-none mt-1 mb-[-9px]">
            25
          </p>
        </div>

        <div class="flex flex-col mt-auto w-[250px]">
          <div class="flex flex-row font-semibold gap-6 text-[35px] leading-none uppercase">
            Most Common Medication
          </div>
        </div>

        <div class="mt-auto hidden md:block h-24 border-l-2 border-dashed text-[#00c498"></div>

        <div class="flex flex-col text-lg mt-auto w-2xs">
          These are the most commonly-prescribed medication.
        </div>
      </div>

      <!-- Swiper Slider -->
      <ClientOnly>

        <Swiper
            :modules="[Pagination]"
            :pagination="{ clickable: true }"
            :slides-per-view="1"
            :space-between="20"
            class="mt-16"
        >
          <SwiperSlide
              v-for="(chunk, index) in products"
              :key="index"
          >
            <ul class="flex flex-wrap gap-4">
              <li
                  v-for="product in chunk"
                  :key="product.id"
                  class="medications-item"
              >
                <NuxtLink
                    :to="`/product/${product.slug}`"
                    class="medications-link"
                >
                  <span class="flex items-center gap-2">
                    <svg class="svg-sprite-icon icon-pills_002 medications-icon w-[25px] h-[25px] text-gray-300">
                      <use xlink:href="/img/sprite/symbol/sprite.svg#pills_002"></use>
                    </svg>
                    <span>{{ product.title }}</span>
                  </span>

                  <svg class="svg-sprite-icon icon-arrow_right w-[20px] h-[20px]">
                    <use xlink:href="/img/sprite/symbol/sprite.svg#arrow_right"></use>
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMainStore } from '~/stores/main'
import type { IProductMin } from '~/types/core'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const mainStore = useMainStore()
const products = ref<IProductMin[][]>([])
const { isMobile } = useDevice()

onMounted(async () => {
  const data = await mainStore.top()

  if (data?.length) {
    const chunkSize = isMobile ? 5 : 25
    products.value = []
    for (let i = 0; i < data.length; i += chunkSize) {
      products.value.push(data.slice(i, i + chunkSize))
    }
  }
})
</script>

<style scoped>
.medications-item {
  width: 100%;
}

@media (min-width: 520px) {
  .medications-item {
    width: calc(50% - 8px);
  }
}

@media (min-width: 768px) {
  .medications-item {
    width: calc(33.333% - 12px);
  }
}

.medications-link {
  position: relative;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 500;
  color: #002c4f;
  transition: all .3s ease;
  border-right: 1px dotted rgba(202, 214, 217, .49);
  border-bottom: 1px dotted rgba(202, 214, 217, .49);
  padding: 18px 20px;
  outline: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* LEFT GREEN BAR */
.medications-link:before {
  content: "";
  left: -6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 45px;
  background-color: #00c498;
  opacity: 0;
  transition: all .3s ease;
}

.medications-link:hover:before {
  opacity: 1;
}

/* DEFAULT COLORS */
.medications-link span {
  color: #002c4f;
}

.medications-link .medications-icon,
.medications-link .icon-arrow_right {
  color: #c5c5c5;
  fill: #c5c5c5;
}

.medications-link svg use {
  fill: #c5c5c5;
}

/* HOVER COLORS */
.medications-link:hover span {
  color: #00c498;
}

.medications-link:hover .medications-icon,
.medications-link:hover .icon-arrow_right {
  color: #00c498;
  fill: #00c498;
}

.medications-link:hover svg use {
  fill: #00c498;
}
</style>
