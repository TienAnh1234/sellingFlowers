import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://localhost:8080/api/category';


  categories: Category[]=[]

  // constructor() { }
  constructor(private HttpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.HttpClient.get<Category[]>(this.categoryUrl);
  }
} 
