import { Component } from "@angular/core";
import { IProduct } from "./product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../service/product.service";

@Component({
    selector: 'pm-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.css']
})

export class ProductUpdateComponent  {
    id: number = 0;
    product: IProduct  = {
        productId: 0,
        productName: "",
        productDescription: "",
        date: new Date()
    };
    updateVisible: boolean = false;
    showTable: boolean = true;

    constructor(private productService: ProductService, private router: Router , private route: ActivatedRoute){}
    ngOnInit():void{
        this.id = this.route.snapshot.params['id'];
        if (this.id) {
            this.productService.getProductById(this.id).subscribe(data=>{
                this.product = data;
            });
        }
    }

    
    saveUpdate() {
        this.productService.updateProduct(this.id, this.product).subscribe(data=>{
            this.product=data;
            this.router.navigate(['/products']);
        })
        //reset form
        //this.updateVisible[this.id] = false;
    }

    showTableToggle(): void {
        this.showTable =!this.showTable;
    }

    toBack(): void {
        this.showTable = false;
        this.router.navigate(['/products']);
    }
}