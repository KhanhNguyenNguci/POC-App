import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "../service/product.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductUpdateComponent } from "./product-update.component";
// import { ProductDetailComponent } from "../product-detail/product-detail.component";
// import { ProductDetailService } from "../service/product-detail.service";

@Component ({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ProductService],
})

export class ProductListComponent implements OnInit{
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
    //name field cannot be empty
    nameError: boolean = false;

    //Sort table
    sortedProducts: any[] = []; // New array for sorted products
    sortDirection: number = 1; // 1 for ascending, -1 for descending
    sortKey: string = 'productName'; // Initial sort key

    @ViewChild(ProductUpdateComponent) productUpdateComponent!: ProductUpdateComponent;
    ngOnInit():void{ ///////IMPORTANT:
        this.sub = this.productService.getProducts().subscribe(products =>{
            //this.products = products;
            this.products = products.map(product => ({
                ...product,//full fields 
                date: new Date(product.date) // Chuyển đổi chuỗi thành đối tượng Date
            }));
        });
        this.sortedProducts = [...this.products]; //...this.products (spread syntax)
        /**
         * Nếu bạn đang gặp phải vấn đề rằng các trường trong đối tượng sản phẩm (`IProduct`) bị chuyển đổi thành kiểu `string` sau khi nhận được từ dịch vụ, có thể do một trong các nguyên nhân sau:

            1. **Server Response**: Kiểm tra xem dữ liệu trả về từ API có đúng kiểu không. Đôi khi, server có thể trả về dữ liệu dưới dạng chuỗi JSON và khi JavaScript phân tích cú pháp, các giá trị ngày tháng có thể được chuyển đổi thành chuỗi.

            2. **TypeScript Interface**: Đảm bảo rằng bạn đang sử dụng kiểu `Date` đúng cách trong TypeScript. Nếu dữ liệu trả về từ server là chuỗi đại diện cho ngày tháng, bạn cần phải chuyển đổi chúng thành đối tượng `Date` sau khi nhận dữ liệu.

            Dưới đây là cách bạn có thể làm điều đó:

            ```typescript
            this.sub = this.productService.getProducts().subscribe(products => {
                this.products = products.map(product => ({
                    ...product,
                    date: new Date(product.date) // Chuyển đổi chuỗi thành đối tượng Date
                }));
            });
            ```

            Với đoạn mã này, bạn sẽ giữ lại kiểu dữ liệu nguyên thủy cho các trường khác trong đối tượng `IProduct`, trong khi trường `date` sẽ được chuyển đổi thành đối tượng `Date` khi cần thiết.
         */
    }
    ngDestroy(): void {
        this.sub.unsubscribe();
    }
    constructor(private productService: ProductService, private router:Router) {}

    updateRow(id: number) {
        this.router.navigate(['product-update',id]);
        this.toggleTable();
        //console.log("0k");
    }
    
    deleteRow(id: number) {
        this.productService.deleteProductById(id).subscribe(data=>{
            console.log(data);
        })
    }

    insertRow(): void{
        const cleanedDescription = this.stripHtmlTags(this.newProductDescription);
        const newProductId = this.products.reduce((max, product) => (product.productId > max ? product.productId : max), this.products[0].productId);

        const newProduct: IProduct = {
            productId: newProductId + 1,
            productName: this.newProductName,
            productDescription: cleanedDescription,
            date: this.date,
        };
        
        this.productService.createProduct(newProduct).subscribe(data=>{
            this.router.navigate(['/products']);
            console.log(data);
        });
        this.resetForm();
    }

    validateAndInsert() {
        if (!this.newProductName) {
            this.nameError = true;
            return;
        }
        this.insertRow();
    }
    

    resetForm(): void {
        this.newProductName = '';
        this.newProductDescription = '';
        this.visible = false;
        this.nameError = false;
        this.router.navigate(['/product']);
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

    sortBy(key: keyof IProduct) {
        if (this.sortKey === key) {
          this.sortDirection = -this.sortDirection; // Reverse sort direction if same key is clicked
        } else {
          this.sortKey = key; // Change sort key
          this.sortDirection = 1; // Default to ascending order when new key is selected
        }
    
        this.sortedProducts = [...this.products].sort((a, b) => {
          // Using localeCompare for string comparison to handle case sensitivity
          return this.sortDirection * (a[key] as any).localeCompare(b[key] as any);
        });

        this.products = [...this.sortedProducts];
    }
    toggleTable() {
        if (this.productUpdateComponent) {
            this.productUpdateComponent.showTableToggle();
        }
    }
}