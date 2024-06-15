export interface IProductListDetail {
    productDetailId: number;
    productDetailName: string;
    productDetailDescription: string;
    DetailStartDate: string;
    DetailEndDate: string;
}

export interface IProductDetail {
    productId: number;
    productstDetail: IProductListDetail[];
}
