import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  public totalItemSubject = new Subject<number>();




  categoryId: number =1;
  checkCategoryId: boolean = false;
  products: Product[] =[];



  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private productService: ProductService
  ) { }



  ngOnInit(): void {

    this.route.paramMap.subscribe(() =>{
      this.currentPage = 1;
      this.checkCategoryId = this.route.snapshot.paramMap.has('id')
      if(this.checkCategoryId){
        this.categoryId = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.listProductWithCategory(this.categoryId);
      }else{
        this.listProduct();
      }
    })  
  }

  listProduct() {
    this.productService.getProductList().subscribe(
      data =>{
        this.products = data;
        // console.log(JSON.stringify(this.products));
      }
    )
  }

  listProductWithCategory(theCategoryId: number) {
    this.productService.getProductListWithCategory(theCategoryId).subscribe(
      data =>{
        this.products = data;
        // console.log(JSON.stringify(this.products));
      }
    )
  }






   // Biến trang hiện tại và số sản phẩm mỗi trang
   currentPage: number = 1;
   pageSize: number = 3;
 
   // Phương thức lấy sản phẩm trong trang hiện tại
   get paginatedProducts() {
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = startIndex + this.pageSize;
     return this.products.slice(startIndex, endIndex);
   }
 
   // Phương thức thay đổi trang
   changePage(page: number) {
     if (page > 0 && page <= this.totalPages) {
       this.currentPage = page;
     }
   }
 
   // Tính tổng số trang
   get totalPages() {
     return Math.ceil(this.products.length / this.pageSize);
   }


   addToCart(product: Product){
    this.cartService.releaseValueTotalItem();
    this.cartService.addToCartService(product);
   }

}
