<template>
  <UContainer>
    <div v-if="product" class=" pt-6 px-0 md:px-4">
      <h1 class="text-xl uppercase font-bold mb-8">{{ product.title }}</h1>

      <div class="flex md:flex-row flex-col">
        <div class="flex flex-row">
        <div class="flex flex-col flex-wrap">
          <img
            :src="media(product?.image?.src)"
            alt="product"
            class="w-[230px] h-auto rounded mb-6 "
          />
        </div>

        <!-- Price Display -->
        <div class="flex md:hidden flex-col  w-[40%] md:w-[20%]">
          <div v-if="product?.prices?.length" class="space-y-6">
            <div class="mt-4 flex flex-col md:flex-row gap-4 items-start">
              <!-- USA Price Column (shown first on mobile) -->
              <div class="flex flex-col text-gray-500 w-full md:w-auto">
                <div class="uppercase text-sm font-medium mb-1">USA Price</div>
                <p class="text-red-400 text-lg ">
                  $ {{ selectedPrice?.original ?? '—' }}
                </p>
              </div>

              <!-- Main Price Column -->
              <div class="flex flex-col w-full md:w-auto">
                <div class="uppercase text-start text-lg font-semibold mb-2">Our <br/> best price</div>
                <p class="font-bold text-3xl text-green-pharma">
                  $ {{ selectedPrice?.price ?? '—' }}
                </p>
                <p v-if="selectedPrice?.original" class="line-through text-gray-400">
                  $ {{ selectedPrice.original }}
                </p>
                <p v-if="selectedPrice?.original && discountPercentage > 0"
                   class="text-green-pharma font-semibold"
                >
                  save: {{ discountPercentage }}%
                </p>
              </div>
            </div>
          </div>

        </div>
        </div>
        <div class="flex flex-row md:flex-col flex-wrap w-full md:w-[60%]">

          <div v-if="product?.prices?.length" class="space-y-6">
            <h2 class="uppercase  mb-2">Form</h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="form in uniqueForms"
                :key="form as string"
                @click="selectedForm = form as string"
                :class="['px-3 py-1 rounded border border-gray-200 ', selectedForm === form ? 'bg-lightgreen-pharma border-green-pharma ' : 'bg-white']"
              >
                {{ form }}
              </button>
            </div>

            <h2 class="uppercase mb-2">Dosage</h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="dosage in uniqueDosages"
                :key="dosage as string"
                @click="selectedDosage = dosage as string"
                :class="['px-3 py-1 rounded border border-gray-200 md:max-w-[200px] w-full', selectedDosage === dosage ? 'bg-lightgreen-pharma border-green-pharma' : 'bg-white']"
              >
                {{ dosage }}
              </button>
            </div>

            <h2 class="uppercase  mb-2">Quantity</h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="qty in availableQuantities"
                :key="qty"
                @click="selectedQuantity = qty"
                :class="['px-6 py-1 min-w-[50px] rounded border border-gray-200 ', selectedQuantity === qty ? 'bg-lightgreen-pharma border-green-pharma' : 'bg-white']"
              >
                {{ qty }}
              </button>
            </div>
          </div>
        </div>
        <!-- Price Display -->
        <div class="hidden md:flex flex-row md:flex-col flex-wrap w-full md:w-[25%]">
       <div v-if="product?.prices?.length" class="space-y-6">
            <div class="mt-4 text-lg flex flex-row justify-between flex-wrap">
            <div class="uppercase text-start text-xl font-semibold"> Our <br/> best price</div>
            <!-- USA Price Column -->
            <div class="flex flex-col text-gray-500">
              <div class="uppercase text-sm font-medium mb-1">USA Price</div>
              <p class=" text-red-400 font-semibold text-lg">
                $ {{ selectedPrice?.original ?? '—' }}
              </p>
            </div>
            </div>

              <!-- Main Price -->
              <div class="flex flex-col">
                <p class="font-bold text-3xl text-green-pharma">
                  $ {{ selectedPrice?.price ?? '—' }}
                </p>
                <p v-if="selectedPrice?.original" class="line-through text-gray-400">
                  $ {{ selectedPrice.original }}
                </p>
                <p v-if="selectedPrice?.original && discountPercentage > 0"
                   class="text-green-pharma font-semibold"
                >
                  save: {{ discountPercentage }}%
                </p>
              </div>
          </div>
        </div>
      </div>
      <!-- DYNAMIC TABS -->
      <div v-if="tabs.length" class="mt-6 mb-12">

        <!-- DESKTOP TABS -->
        <div class="hidden md:block ">
          <div class="tabs flex">
            <button
              v-for="tab in tabs"
              :key="tab.slug"
              @click="activeTab = tab.slug"
              :class="[
          'px-4 py-2 -mb-px font-semibold cursor-pointer',
          activeTab === tab.slug ? 'border-b-1 border-green-pharma text-blue-500' : 'text-gray-300'
        ]"
            >
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content flex mt-8 gap-12">
            <!-- Left column: Quick links (if multiple contents inside tab) -->
            <div v-if="currentTabLinks.length > 1" class="w-1/4 flex flex-col gap-2">
              <h2 class="hidden md:block">Quick Links</h2>
              <div class="dashed-horizontal mb-4"></div>

              <button
                v-for="item in currentTabLinks"
                :key="item.slug"
                @click="activeLink = item.slug"
                :class="['text-left px-2 py-1 rounded cursor-pointer', activeLink === item.slug ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100']"
              >
                {{ item.title }}
              </button>
            </div>
            <!-- Right column: Content -->
            <div :class="currentTabLinks.length > 1 ? 'w-3/4' : 'w-full'">
              <h2 v-if="activeLink" class="font-bold">
                {{ currentTabLinks.find(item => item.slug === activeLink)?.title }}
              </h2>
              <div class="dashed-horizontal mt-2 mb-7"></div>

              <div class="product-description" v-html="activeContent"></div>

            </div>
          </div>
        </div>

        <!-- MOBILE ACCORDION -->
        <div class=" md:hidden flex flex-col gap-1">
          <div v-for="tab in tabs" :key="tab.slug" class=" tabs-item" >
            <!-- Tab header -->
            <button
              @click="mobileActiveTab = mobileActiveTab === tab.slug ? '' : tab.slug"
              class="w-full flex justify-between items-center font-semibold text-left"
            >
              {{ tab.title }}
              <span class="toggle-symbol w-full">{{ mobileActiveTab === tab.slug ? '&minus;' : '&plus;' }}</span>

            </button>
            <div class="dashed-horizontal mb-4"></div>

            <!-- Tab body -->
            <div v-show="mobileActiveTab === tab.slug" class=" pb-4">

              <!-- Quick Links -->
              <div v-if="tab.items.length > 1" class="mb-2">
                <h3 class="font-medium hidden md:block">Quick Links</h3>
                <div class="border-t-[0.5] border-dotted border-gray-200 w-full my-0 md:my-2"></div>

                <div v-for="item in tab.items" :key="item.slug" class="mb-1">
                  <!-- Quick link header -->
                  <button
                    @click="mobileActiveLink = mobileActiveLink === item.slug ? '' : item.slug"
                    class="w-full flex justify-between
                    items-center py-2 font-semibold
                    text-left rounded  gap-2"
                  >
                    {{ item.title }}
                    <span
                      class=" transform transition-transform duration-200 text-green-pharma"
                      :class="{ 'rotate-180': mobileActiveLink === item.slug }"
                    >
              <svg class="svg-sprite-icon icon-angle-down d-lg-none w-[20px] h-[20px] font-light !text-green-pharma">
                        <use xlink:href="/img/sprite/symbol/sprite.svg#angle-down"></use></svg>
            </span>
                  </button>

                  <!-- Quick link content -->
                  <div v-show="mobileActiveLink === item.slug" class="py-2">
<!--                    <div v-html="item.content" class="text-gray-700"></div>-->
                    <div class="product-description" v-html="item.content"></div>

                  </div>
                </div>
              </div>

              <!-- Single content tab (no quick links) -->
              <div v-else-if="tab?.items.length === 1">
                <div v-html="tab?.items[0]?.content" class="text-gray-700"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div v-else class="py-10 text-gray-500">
      Loading...
    </div>
  </UContainer>
  <TopSavings class="mb-12" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from '#imports'
import { useMainStore } from '@/stores/main'
import type {
  Product,
  Tab,
  AdditionalContent
} from "~/types/product";


const route = useRoute()
const store = useMainStore()

const additional = ref<AdditionalContent>({})
const tabs = ref<Tab[]>([])

const activeTab = ref('')
const activeLink = ref('')

onMounted(async () => {
  const slug = route.params.slug as string
  product.value = await store.product(slug)
  additional.value = await store.additional(slug)

  if (additional.value) {
    // Build tabs from API response
    const apiTabs: any[] = []

    if (additional.value.info?.length ) {
      apiTabs.push({
        slug: 'info',
        title: 'Info',
        items: additional.value.info
      })
    }

    if (additional.value.side_effects?.length) {
      apiTabs.push({
        slug: 'side-effects',
        title: 'Side Effects',
        items: additional.value.side_effects
      })
    }

    tabs.value = apiTabs

    // Set default active tab and link
    if (tabs.value.length) {
      activeTab.value = tabs?.value[0]?.slug || ''
      activeLink.value = tabs?.value[0]?.items[0]?.slug || ''
    }
  }
})

/* Media URL helper */
const media = (path?: string) => store.mediaUrl(path)

const product = ref<Product | null>(null)

// State
const selectedForm = ref('')
const selectedDosage = ref('')
const selectedQuantity = ref('')

// Computed: unique forms and dosages
const uniqueForms = computed(() => [...new Set(product?.value?.prices.map(p => p.form))])
const uniqueDosages = computed(() => {
  return [...new Set(product?.value?.prices.filter(p => p.form === selectedForm.value).map(p => p.dosage))]
})
const availableQuantities = computed(() => {
  return product?.value?.prices
    .filter(p => p.form === selectedForm.value && p.dosage === selectedDosage.value)
    .map(p => p.quantity)
})

// Compute selected price object
const selectedPrice = computed(() => {
  return product?.value?.prices.find(p =>
    p.form === selectedForm.value &&
    p.dosage === selectedDosage.value &&
    p.quantity === selectedQuantity.value
  )
})

const discountPercentage = computed(() => {
  const priceObj = selectedPrice.value

  if (!priceObj?.price || !priceObj?.original) return 0

  const original = parseFloat(priceObj.original)
  const price = parseFloat(priceObj.price)

  return Math.round(((original - price) / original) * 100)
})

// Initialize defaults
watch(product, () => {
  if (!product.value?.prices?.length) return
  const defaultPrice = product.value.prices.find(p => p.default) || product.value.prices[0]
  selectedForm.value = defaultPrice?.form || ''
  selectedDosage.value = defaultPrice?.dosage || ''
  selectedQuantity.value = defaultPrice?.quantity || ''
}, { immediate: true })


// Reset lower-level selections when parent changes
const prices = computed(() => product.value?.prices || [])

watch(selectedForm, () => {
  const p = prices.value.find(p => p.form === selectedForm.value)
  selectedDosage.value = p?.dosage || ''
}, { immediate: true })

watch(selectedDosage, () => {
  const p = prices.value.find(p =>
    p.form === selectedForm.value && p.dosage === selectedDosage.value
  )
  selectedQuantity.value = p?.quantity || ''
}, { immediate: true })


/* Computed: current tab items */
const currentTabLinks = computed(() => {
  const tab = tabs.value.find(t => t.slug === activeTab.value)
  return tab?.items || []
})

/* Computed: active content */
const activeContent = computed(() => {
  const link = currentTabLinks.value.find(item => item.slug === activeLink.value)
  return link?.content || ''
})

/* Watch tab change: auto-select first link */
watch(activeTab, (tabSlug) => {
  const tab = tabs.value.find(t => t.slug === tabSlug)
  const first = tab?.items?.[0]
  activeLink.value = first?.slug ?? ''
})

// Add reactive state for mobile accordion
const mobileActiveTab = ref('')
const mobileActiveLink = ref('')

// Reset quick link when tab is closed
watch(mobileActiveTab, (tabSlug) => {
  if (!tabSlug) mobileActiveLink.value = ''
})

</script>

<style scoped>
.tabs button:focus {
  outline: none;
}

.toggle-symbol {
  display: inline-block;
  width: 25px;
  text-align: center;
  font-size: 25px;
  font-weight: lighter;
  color: #cad6d9;
}

.dashed-horizontal {
  width: 62px;
  height: 2px;
  background: url(/img/common/dotted-2.png) no-repeat 50% / contain;
}

</style>
