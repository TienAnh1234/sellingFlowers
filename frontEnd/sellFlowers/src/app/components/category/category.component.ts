import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = [];


  ngOnInit(): void {
    // this.categories = this.categoryService.categories;
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

}
