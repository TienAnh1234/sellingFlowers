import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { Product } from 'src/app/common/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];

  categories: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.listCategory();
    this.listProduct();
  }



  listProduct() {
    this.productService.getProductList().subscribe(
      data =>{
        this.products = data;
        // console.log(JSON.stringify(this.products));
      }
    )
  }


  listCategory() {
    this.categoryService.getCategoryList().subscribe(
      data =>{
        // console.log(JSON.stringify(data));
        this.categories = data;
        console.log(JSON.stringify(this.categories));
      }
    )
  }

  hasProductInCategory(category: Category, product: Product): boolean {
    return category.products?.some(obj => obj.id === product.id)  ;
  }

  editProduct(product:Product){ 
    for(const category12 of this.categories){
      if(this.hasProductInCategory(category12,product))
      {
        product.category = category12;
      }
    }
    this.productService.product = product;
    this.router.navigate(['/editProduct']);
  }

  deleteProduct(product1:Product){
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(product1.id).subscribe();
      window.location.reload()
    }



  }

}
