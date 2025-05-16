import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../common/product';
import { ProductInCart } from '../common/product-in-cart';

@Injectable({
  providedIn: 'root' //Service này sẽ không bị hủy cho đến khi ứng dụng bị đóng.
})
export class CartService {

  totalItemsValue: number = 0;
  cartItems: ProductInCart[] = [];
  public totalItemSubject = new Subject<number>();

  constructor() { }

  releaseValueTotalItem(){
    this.totalItemsValue++;
    this.totalItemSubject.next(this.totalItemsValue);
  }

  addToCartService(product: Product){
    let productInCart = new ProductInCart(product);
    console.log(productInCart);
    var checkItemInCart:number = 0;
    if(this.cartItems.length > 0){
      for (let cartItem of this.cartItems) {
        if(cartItem.id == product.id){
          cartItem.quantity++;
          checkItemInCart = 1;
          break;
        }
      }
      if(checkItemInCart == 0){
        this.cartItems.push(productInCart);
      }
    }else{
      this.cartItems.push(productInCart);
    }


  }




}
