import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "../service/product.service";
import { Subscription } from "rxjs";
// import { ProductDetailComponent } from "../product-detail/product-detail.component";
// import { ProductDetailService } from "../service/product-detail.service";

@Component ({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ProductService],
})

export class ProductListComponent implements OnInit {
    date: Date = new Date();
    pageTitle = 'Product List';
    color: string = '#FFFFFF';
    visible: boolean = false;
    showTable: boolean = false;

    newProductName: string = '';
    newProductDescription: string = '';
    products: IProduct[] = [];
    updateVisible: boolean[] = new Array(this.products.length).fill(false);
    sub!: Subscription;
    // sub2!: Subscription;
    // @ViewChild(ProductDetailComponent)
    // private productDetailComponent!: ProductDetailComponent;
    ngOnInit():void{
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
            },
        });
        // this.sub2 = this.ProductDetailService.getProductsDetail().subscribe({
        //     // complete: () => console.log('Observable emitted the complete notification'),
        //     next: (product) => {
        //         this.productDetailComponent.productsDetail = product;
        //         //this.productsDetail = product;
        //         console.log('ok');
        //     },
        // });
    }
    ngDestroy(): void {
        this.sub.unsubscribe();
        // this.sub2.unsubscribe();
    }
    constructor(private productService: ProductService) {}

    updateRow(index: number) {
        this.newProductName = this.products[index].productName;
        this.newProductDescription = this.products[index].productDescription;
        this.updateVisible[index] = true;
    }
    saveUpdate(index: number) {
        this.products[index].productName = this.newProductName;
        this.products[index].productDescription = this.newProductDescription;
        //reset form
        this.updateVisible[index] = false;
        this.newProductName = '';
        this.newProductDescription = '';
    }
    deleteRow(index: number) {
        if (index > -1 && index < this.products.length) {
            //find index of product detail list
            //const idDeletedProduct = this.products[index].productId;
            //delete child products
            //this.productDetailComponent.deleteProductDetail(idDeletedProduct);
            this.products.splice(index, 1);
            //console.log(index);
        }
    }

    formatDate(date: Date): string {
        // Get day, month, and year from the date object
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1; // Months are zero-based
        const year: number = date.getFullYear();
    
        // Pad day and month with leading zeros if necessary
        const formattedDay: string = day < 10 ? '0' + day : day.toString();
        const formattedMonth: string = month < 10 ? '0' + month : month.toString();
    
        // Return the formatted date string
        return formattedDay + '/' + formattedMonth + '/' + year;
    }
    

    insertRow(): void{
        const cleanedDescription = this.stripHtmlTags(this.newProductDescription);
        const newProductId: number = this.products[this.products.length - 1].productId;
        const newProduct: IProduct = {
            productId: newProductId + 1,
            productName: this.newProductName,
            productDescription: cleanedDescription,
            realeaseDate: this.formatDate(this.date),
        };
        if (newProduct.productName !== '' || newProduct.productDescription !== '') {
            this.products.push(newProduct);
        }
        this.resetForm();
    }
    resetForm(): void {
        this.newProductName = '';
        this.newProductDescription = '';
        this.visible = false;
    }

    stripHtmlTags(input: string): string {
        return input.replace(/<\/?[^>]+(>|$)/g, "");
    }

    showDialog(): void {
        this.visible = true;
    }

    showTableToggle(): void {
        this.showTable =!this.showTable;
    }
}