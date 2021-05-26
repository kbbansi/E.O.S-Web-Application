import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { Product } from '../../product';
import { CartService } from "../../../services/cart/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  dataBucket: any = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private cart: CartService) { }

  ngOnInit(): void {
    this.getOneProduct();
  }

  getOneProduct(){
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    console.log(productIdFromRoute);

    this.api.getOneProduct(productIdFromRoute).subscribe(response => {
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        this.product = this.dataBucket.message;
        console.log(this.product);
      }
    })
  }

  addToCart(product: Product){
    this.cart.addToCart(product);
    window.alert('Product Added to Cart');
  }

  increaseQuantiy(product: Product) {
    this.cart.increaseQuantity(product);
  }
  
  decreaseQuantity(product: Product) {
    this.cart.decreaseQuantity(product);
  }

}
