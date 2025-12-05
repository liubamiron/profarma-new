import Swiper from "swiper/types/swiper-class";

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
}

export interface IProductSearch extends IProductMin {
    image: IProductImage | null
    price: IProductPrice | null
}

export interface IProduct extends IProductMin {
    overview: string
    is_generic: boolean
    products: IProduct[]
    image: IProductImage | null
    price: IProductPrice | null
    images: IProductImage[]
    prices: IProductPrice[]
    info: IProductInfo[]
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

/** Classes **/

export class TSwiperPagination {
    page: number = 0;
    total: number = 0
    prev: boolean = false
    next: boolean = false

    private _swiper: Swiper | null = null

    constructor(swiper: Swiper | null = null) {
        swiper && this.init(swiper);
    }

    init(swiper: Swiper) {
        this._swiper = swiper;
        this.change();
    }

    change() {
        if (this._swiper) {
            this.total = this._swiper['snapGrid'].length;
            this.page = this._swiper.activeIndex;
            this.prev = !this._swiper.isBeginning;
            this.next = !this._swiper.isEnd;
        }
    }

    slide = {
        to: (page) => {
            console.log(page)
            this._swiper && this._swiper.slideTo(page);
        },
        prev: () => {
            this._swiper && this._swiper.slidePrev();
        },
        next: () => {
            this._swiper && this._swiper.slideNext();
        }
    }
}
