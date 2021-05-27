import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './components/shop/shop.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { ProductTagComponent } from './components/product-tag/product-tag.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { ProfileIndexComponent } from './components/profile-index/profile-index.component';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    UserAccountComponent,
    ProductDetailsComponent,
    CheckoutCartComponent,
    AuthenticationComponent,
    WelcomeComponent,
    ProductsComponent,
    ProductTagComponent,
    ProductCategoryComponent,
    LoginComponent,
    OrderComponent,
    AccountDetailsComponent,
    ProfileIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
