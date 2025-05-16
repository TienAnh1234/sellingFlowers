import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/common/category';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product! : Product;
  productForm!: FormGroup;
  categories: Category[] = [];
  showNotification = false;
  selectedFile!: File;



  constructor(  private categoryService: CategoryService,
                private productService: ProductService,
                private router: Router,
                private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.product = this.productService.product;

        this.productForm = this.formBuilder.group({
          productName: [this.product.name, [Validators.required, Validators.minLength(3)]],
          productDescription: [this.product.description, [Validators.required, Validators.minLength(10)]],
          productPrice: [this.product.price, [Validators.required, Validators.min(0)]],
          productQuantity: [this.product.quantity, [Validators.required, Validators.min(0)]],
          productCategory: [this.product.category.id, Validators.required],
          productImage: ['']
        });

        this.listCategory();

  }

  listCategory() {
    this.categoryService.getCategoryList().subscribe(
      data =>{
        // console.log(JSON.stringify(data));
        this.categories = data;
        // console.log(JSON.stringify(this.categories));
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onSubmit(){
    if(this.productForm.valid == false){
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
      console.log('Form không hợp lệ!', this.productForm.errors);

    }else{
      const formData = new FormData();
      formData.append('name', this.productForm.value.productName);
      formData.append('description', this.productForm.value.productDescription);
      formData.append('price', this.productForm.value.productPrice);
      formData.append('quantity', this.productForm.value.productQuantity);
      formData.append('category', this.productForm.value.productCategory);
      formData.append('imageUrl', this.product.imageUrl);
      formData.append('file',this.selectedFile);

      
      this.productService.updateProduct(formData,this.product.id).subscribe(
        data =>{
          console.log('Sản phẩm đã được lưu:', data);
          this.router.navigate(['/admin']);
        }
      ) 


    }



  }

}
