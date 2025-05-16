import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/common/category';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  categories: Category[] = [];
  showNotification = false;
  selectedFile!: File;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router
  ) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productDescription: ['', [Validators.required, Validators.minLength(10)]],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      productQuantity: [0, [Validators.required, Validators.min(0)]],
      productCategory: ['', Validators.required],
      productImage: ['', Validators.required]
    });

    this.listCategory();
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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

  onSubmit(){
    if(this.productForm.valid == false){
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
      console.log('Form không hợp lệ!', this.productForm.controls);

    }else{
      const formData = new FormData();
      formData.append('name', this.productForm.value.productName);
      formData.append('description', this.productForm.value.productDescription);
      formData.append('price', this.productForm.value.productPrice);
      formData.append('quantity', this.productForm.value.productQuantity);
      formData.append('category', this.productForm.value.productCategory);
      formData.append('imageUrl', this.productForm.value.productImage);
      formData.append('file',this.selectedFile);
      console.log('Form không hợp lệ!', formData.get('file'));

      this.productService.saveProduct(formData).subscribe(
        data =>{
          console.log('Sản phẩm đã được lưu:', data);
          this.router.navigate(['/home']);
        }
      ) 
    }
    
  }



}
