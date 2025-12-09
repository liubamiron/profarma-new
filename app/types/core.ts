
export interface IResponse {
  success: boolean
  data: any
  errors?: any
}

export interface IModals {
  [key: string]: IModal

  order: IOrderModal
}

export interface IModal {
  show: boolean
}

export interface IOrderModal extends IModal {
  product: IProductMin
  price: IProductPriceMin
}

export interface IMeta {
  title: string
  description: string
  custom: string
  url: string | null
}

export interface IImage {
  path: string
}

export interface IBlock {
  slug: string
  value: string
}

export interface IFaq {
  question: string
  answer: string
}

export interface IPage {
  slug: string
  title: string
  note: string
  content: string
  updated_at: number
}

export interface IAbout {
  title: string
  content: string
  image: IImage
}

export interface IRedirect {
  id: number
  from: string
  to: string
}

export interface IProductMin {
  id: number
  slug: string
  title: string
  image: IProductImage | null
  is_generic: boolean
  price: {
    price: string
    original: string
  }
}

export interface IProductSearch extends IProductMin {
  image: IProductImage | null
  price: {
    price: string
    original: string
  }
  title: string
}

export interface IProduct extends IProductMin {
  overview: string
  is_generic: boolean
  products: IProduct[]
  image: IProductImage | null
  images: IProductImage[]
  prices: {
    price: string
    original: string
  }
  info: IProductInfo[]
  title: string
}

export interface ICartItem {
  product: IProduct
  options: IProductOptions
  prices: IPrice[]
}

export interface IProductImage {
  src: string
  title: string
  description: string
}

export interface IProductInfo {
  id: number
  title: string
  content: string
  prices: {
    price: string
    original: string
  }
  image: string
}

export interface IProductOptions {
  form: string
  dosage: string
  quantity: string
}

export interface IProductPriceMin extends IProductOptions {
  price: number
}

export interface IProductPrice extends IProductPriceMin {
  id: number
  default: boolean
  original: number
}

export interface IHistory {
  product: IProduct
  filter: IProductOptions
}

export interface ISearch {
  results: IProductMin[]
  history: IHistory[]
}

export interface IPrice {
  original: number
  price: number
}

/** Types **/

export interface IObject<T> {
  [key: string]: T
}

export interface IIndexed<T> {
  [key: number]: T
}
