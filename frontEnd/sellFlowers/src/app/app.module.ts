import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'home', component: ProductListComponent },
  { path: 'home/category/:id', component: ProductListComponent },

  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'editProduct', component: EditProductComponent },



  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect default route
  { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Redirect default route


];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryComponent,
    HeaderComponent,
    CartComponent,
    AdminComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
