package com.example.demo.Service;

import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    ResponseEntity<List<Category>> getAllCategories();
    ResponseEntity<Category> saveCategory(Category category);
    Optional<Category> findCategoryById(Long id);
    String deleteCategory(Long id);
    ResponseEntity<Category> updateCategory(Long id, Category category);
}
