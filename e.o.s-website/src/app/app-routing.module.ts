import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductTagComponent } from './components/product-tag/product-tag.component';
import { ProductsComponent } from './components/products/products.component';
import { ShopComponent } from './components/shop/shop.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: AuthenticationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserAccountComponent },
  { path: 'view-cart', component: CheckoutCartComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  // child routes here
  { 
    path: 'shop', 
    component: ShopComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'kente-men',
        component: ProductTagComponent
      },
      {
        path: 'kente-women',
        component: ProductTagComponent
      },
      {
        path: 'category/:id',
        component: ProductCategoryComponent
      }
    ]
   }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
