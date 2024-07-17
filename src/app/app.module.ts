import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './features/product/product-list.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DateFormatPipe } from './shared/date-format.pipe';
import { ProductUpdateComponent } from './features/product/product-update.component';
import { WelcomeComponent } from './home/welcome.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product-update/:id', component: ProductUpdateComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'home', component: WelcomeComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    DateFormatPipe,
    ProductUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule, ProductListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
