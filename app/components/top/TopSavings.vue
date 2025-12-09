<template>
  <UContainer class=" mt-12 pb-16 bg-lightgreen-pharma">
    <div class="m-auto text-center uppercase text-3xl pt-12"> Sample savings</div>
    <div class="border-t-1 md:border-t-4 border-dotted border-green-pharma md:w-[10%] w-[80%] mx-auto my-2"></div>
    <div class=" text-blue-pharma text-center pt-4 pb-12">Stay Healthy, Be Healthy, Love Life and Enjoy Our Mail Order Service!</div>
    <ClientOnly>
      <Swiper
        :modules="[Pagination]"
        :pagination="{ clickable: true }"
        :space-between="10"
        :breakpoints="{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }"
      >
        <SwiperSlide v-for="product in products" :key="product.id" class="flex justify-center p-4">
          <NuxtLink :to="`/product/${product.slug}`" class="no-underline">
            <UCard class="overflow-hidden hover:shadow-md" style="height: 350px; display: flex; flex-direction: column;">

              <!-- Product image -->
              <div class="flex justify-center items-center h-45 bg-white shrink-0">
                <img
                  :src="product.image?.src ? mainStore.mediaUrl(product.image.src) : '/img/common/fav_icon.png'"
                  :alt="product.title"
                  class="object-contain h-full"
                />
              </div>

              <!-- Product details -->
              <div class="p-4 flex-1 flex flex-col justify-between">
                <!-- Product title -->
                <p class="text-blue-pharma text-xl mb-1 break-words uppercase leading-none">
                  {{ product.title }}
                </p>

                <!-- Brand / Generic -->
                <p class="text-green-pharma text-md mb-2 leading-none">
                  {{ product.is_generic ? 'Generic' : 'Brand' }}
                </p>
                  <p class="text-green-pharma font-bold text-lg ">
                    ${{ product.price?.price || '0.00' }}
                    <span v-if="product.price?.original && product.price.original !== product.price.price" class="text-red-500 text-sm ml-2">
              ({{ discountPercent(product.price.price, product.price.original) }}% OFF)
            </span>
                  </p>
              </div>
            </UCard>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMainStore } from '~/stores/main'
import type { IProductMin } from '~/types/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const mainStore = useMainStore()
const products = ref<IProductMin[]>([])

onMounted(async () => {
  const response = await mainStore.load('/product/samples?expand=image,price', null)
  if (response?.length) {
    products.value = response
  }
})

// Calculate discount percentage
const discountPercent = (price: string, original: string) => {
  const p = parseFloat(price)
  const o = parseFloat(original)
  if (isNaN(p) || isNaN(o) || o <= p) return 0
  return Math.round(((o - p) / o) * 100)
}

</script>

<style scoped>

</style>
