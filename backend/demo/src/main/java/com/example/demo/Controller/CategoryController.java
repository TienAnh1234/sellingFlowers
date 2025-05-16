package com.example.demo.Controller;


import com.example.demo.Entity.Category;
import com.example.demo.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping()
    public ResponseEntity<List<Category>> showAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/save_category")
    public ResponseEntity<Category> saveNew(@RequestBody(required = false) Category category) {
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id,@RequestBody(required = false) Category category ) {
        return categoryService.updateCategory(id, category);
    }

}
