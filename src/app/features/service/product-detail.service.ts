import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IProductDetail } from "../product-detail/product-detail";
//Services/Dependency Module
@Injectable ({
    providedIn: 'root'
})
export class ProductDetailService { //In component class, constructor(private dataService: DataService). Chu y private
    private productUrl = 'api/products/products-detail.json';
    constructor(private http: HttpClient) {}
    getProductsDetail(): Observable<IProductDetail[]> {
        return this.http.get<IProductDetail[]>(this.productUrl).pipe( //get data from product.json with HttpClient
          tap(data => console.log('All: ', JSON.stringify(data))), //print data into console to check for getting data from JSON 
          catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse) {
      let errorMassage = '';
      if(err.error instanceof ErrorEvent) {
        errorMassage = `An error occurred: ${err.error.message}`;
      } else {
        errorMassage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMassage);
      return throwError(()=>errorMassage);
    }
}