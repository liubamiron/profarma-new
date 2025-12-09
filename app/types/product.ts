
export interface PriceItem {
  id: number
  form: string
  dosage: string
  quantity: string
  price: string
  original?: string
  default?: boolean
}

export interface Product {
  id: number
  name: string
  price: string
  title: string
  image: { src: string }
  prices: PriceItem[]
  value: string | number | null
}

export interface TabItem {
  slug: string
  title: string
  content: string
}

export interface Tab {
  slug: string
  title: string
  items: TabItem[]

}

export interface AdditionalContentItem {
  slug: string
  title: string
  content: string
  info: string
  value :{
    info: []
    side_effects: []
  }

}

export interface AdditionalContent {
  info?: AdditionalContentItem[]
  side_effects?: AdditionalContentItem[]
}
