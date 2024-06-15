import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProductDetail } from "./product-detail";
import { Subscription } from "rxjs";
import { ProductDetailService } from "../service/product-detail.service";

@Component ({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    providers: [ProductDetailService],
})

export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    constructor(private route: ActivatedRoute, private router: Router, private ProductDetailService: ProductDetailService) {}
    sub!: Subscription;
    productDetail: IProductDetail[] = [];
    selectedProductDetail!: IProductDetail;
    updateItemName: string = '';
    updateItemDescription: string = '';
    updateVisible!: boolean[];
    productId!: number;
    ngOnInit(): void {
        this.sub = this.ProductDetailService.getProductsDetail().subscribe({
            next: (productDetail) => {
                this.productDetail = productDetail;
                const id = this.route.snapshot.paramMap.get('id');
                if (id === null || isNaN(+id) || +id <= 0) {
                    this.router.navigate(['/product']);
                } else {
                    this.productId = +id;
                    this.selectedProductDetail = this.productDetail.find(product => product.productId === this.productId)!;
                    this.updateVisible = new Array(this.selectedProductDetail.productstDetail.length).fill(false);
                    
                    this.pageTitle += `: ${id}`;
                    if (!this.selectedProductDetail) {
                        this.router.navigate(['/product']);
                    }
                }
            },
        });
    }
    ngDestroy(): void {
        this.sub.unsubscribe();
    }
    deleteItemRow(index: number) {
        if (index > -1 && index < this.selectedProductDetail.productstDetail.length) {
            this.selectedProductDetail.productstDetail.splice(index, 1);
        }
    }
    onBack(): void {
        this.router.navigate(['/products']);
    }

    saveUpdateItem(index: number) {
        this.productDetail[this.productId - 1].productstDetail[index].productDetailName = this.updateItemName;
        this.productDetail[this.productId - 1].productstDetail[index].productDetailDescription = this.updateItemDescription;
        this.updateVisible[index] = false;
        this.resetItemForm();
    }
    resetItemForm(): void {
        this.updateItemName = '';
        this.updateItemDescription = '';
    }
}