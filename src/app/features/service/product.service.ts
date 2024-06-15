import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IProduct } from "../product/product";
//Services/Dependency Module
@Injectable ({
    providedIn: 'root'
})
export class ProductService { //In component class, constructor(private dataService: DataService). Chu y private
    private productUrl = 'api/products/products.json';
    
    constructor(private http: HttpClient) {}
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe( //get data from product.json with HttpClient
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