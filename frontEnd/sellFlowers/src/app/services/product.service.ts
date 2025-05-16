import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/product';


  products: Product[] = [];
  product!: Product;
  

  constructor(private HttpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.HttpClient.get<Product[]>(this.productUrl);
  }

  getProductListWithCategory(theCategoryId: number): Observable<Product[]> {
    const searchProduct = `${this.productUrl}/findByCategoryId/${theCategoryId}`;
    return this.HttpClient.get<Product[]>(searchProduct);
  }

  saveProduct(formData: FormData): Observable<any> {
    const saveProduct = `${this.productUrl}/save_product`;
    console.log("ta" + formData.get("name"));
    return this.HttpClient.post(saveProduct, formData);
  }


  updateProduct(formData:FormData, productId: number):Observable<any>{
    return this.HttpClient.put(`${this.productUrl}/update/${productId}`, formData);
  }

  

  deleteProduct(id: number): Observable<any> {
    return this.HttpClient.delete(`${this.productUrl}/delete/${id}`);
  }


}
