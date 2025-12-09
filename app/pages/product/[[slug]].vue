<template>
  <UContainer>
    <div v-if="product" class="product-page">
      <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>

      <!-- IMAGE -->
      <img
        :src="media(product?.image?.src)"
        alt="product"
        class="w-60 h-auto rounded mb-6 m-auto"
      />

<!--      <p class="text-lg font-bold">€ {{ price.price }}</p>-->
<!--      <p class="line-through text-gray-400 text-sm">€ {{ price.original }}</p>-->


      <div v-if="product?.prices?.length" class="mt-6">
        <h2 class="text-xl font-bold mb-4">Select Option</h2>

        <select
          v-model="selectedPriceId"
          class="border rounded px-3 py-2 md:max-w-[500px] w-full"
        >
          <option
            v-for="price in product.prices"
            :key="price.id"
            :value="price.id"
          >
            dosage:&nbsp;{{ price.dosage }} - quantity:&nbsp;{{ price.quantity }}
          </option>
        </select>

        <!-- Price display -->
        <div class="mt-2 text-lg">
          <p class="font-bold text-xl text-blue-600">
            € {{ selectedPrice?.price ?? '—' }}
          </p>
          <p v-if="selectedPrice?.original" class="line-through text-gray-400">
            € {{ selectedPrice.original }}
          </p>
        </div>
      </div>


      <!-- DYNAMIC TABS -->
      <div v-if="tabs.length" class="mt-6 mb-12">

        <!-- DESKTOP TABS -->
        <div class="hidden md:block">
          <div class="tabs flex border-b">
            <button
              v-for="tab in tabs"
              :key="tab.slug"
              @click="activeTab = tab.slug"
              :class="[
          'px-4 py-2 -mb-px font-semibold cursor-pointer',
          activeTab === tab.slug ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
        ]"
            >
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content flex mt-4 gap-12">
            <!-- Left column: Quick links (if multiple contents inside tab) -->
            <div v-if="currentTabLinks.length > 1" class="w-1/4 flex flex-col gap-2">
              <h2>Quick Links</h2>
              <div class="border-t-[0.5] md:border-t-2 border-dotted border-gray-200 w-full mx-auto"></div>

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
              <div class="border-t-[0.5] md:border-t-2 border-dotted border-gray-200 mt-2 mb-4 w-full"></div>
              <div v-html="activeContent"></div>
            </div>
          </div>
        </div>

        <!-- MOBILE ACCORDION -->
        <div class=" md:hidden flex flex-col gap-4 ">
          <div v-for="tab in tabs" :key="tab.slug" class="border-b border-gray-200 tabs-item" >
            <!-- Tab header -->
            <button
              @click="mobileActiveTab = mobileActiveTab === tab.slug ? '' : tab.slug"
              class="w-full flex justify-between items-center py-3 font-semibold text-left"
            >
              {{ tab.title }}
              <span class="toggle-symbol w-full">{{ mobileActiveTab === tab.slug ? '&minus;' : '&plus;' }}</span>

            </button>

            <!-- Tab body -->
            <div v-show="mobileActiveTab === tab.slug" class="pl-2 pb-4">

              <!-- Quick Links -->
              <div v-if="tab.items.length > 1" class="mb-2">
                <h3 class="font-medium">Quick Links</h3>
                <div class="border-t-[0.5] border-dotted border-gray-200 w-full my-2"></div>

                <div v-for="item in tab.items" :key="item.slug" class="mb-1 border-b border-gray-100">
                  <!-- Quick link header -->
                  <button
                    @click="mobileActiveLink = mobileActiveLink === item.slug ? '' : item.slug"
                    class="w-full flex justify-between items-center px-2 py-2 font-medium text-left rounded hover:bg-gray-100"
                  >
                    {{ item.title }}
                    <span
                      class="text-green-500 transform transition-transform duration-200"
                      :class="{ 'rotate-90': mobileActiveLink === item.slug }"
                    >
              &gt;
            </span>
                  </button>

                  <!-- Quick link content -->
                  <div v-show="mobileActiveLink === item.slug" class="pl-4 py-2">
                    <div v-html="item.content" class="text-gray-700"></div>
                  </div>
                </div>
              </div>

              <!-- Single content tab (no quick links) -->
              <div v-else-if="tab.items.length === 1">
                <div v-html="tab.items[0].content" class="text-gray-700"></div>
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

const route = useRoute()
const store = useMainStore()

const product = ref(null)
const additional = ref(null)
const tabs = ref([])

const activeTab = ref('')
const activeLink = ref('')

onMounted(async () => {
  const slug = route.params.slug as string
  product.value = await store.product(slug)
  additional.value = await store.additional(slug)

  if (additional.value) {
    // Build tabs from API response
    const apiTabs: any[] = []

    if (additional.value.info?.length) {
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
      activeTab.value = tabs.value[0].slug
      activeLink.value = tabs.value[0].items[0]?.slug || ''
    }
  }
})

/* Media URL helper */
const media = (path?: string) => store.mediaUrl(path)

/* First price helper */
const selectedPriceId = ref(null)

// Get selected price object
const selectedPrice = computed(() => {
  return product.value?.prices.find(p => p.id === selectedPriceId.value)
})

// Initialize default selection
watch(product, (val) => {
  if (val?.prices?.length) {
    const defaultPrice = val.prices.find(p => p.default) || val.prices[0]
    selectedPriceId.value = defaultPrice.id
  }
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
  if (tab?.items?.length) {
    activeLink.value = tab.items[0].slug
  } else {
    activeLink.value = ''
  }
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
.product-page {
  padding: 20px;
}

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

</style>
