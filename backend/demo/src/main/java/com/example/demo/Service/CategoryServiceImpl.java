package com.example.demo.Service;

import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import com.example.demo.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public ResponseEntity<List<Category>> getAllCategories() {

        List<Category> listCategories = categoryRepository.findAll();
        if (listCategories.isEmpty()) {
            return null;
        }
        return ResponseEntity.ok(listCategories);
    }

    @Override
    public ResponseEntity<Category> saveCategory(Category category) {
        if(category == null){
            return null;
        }
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @Override
    public Optional<Category> findCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public String deleteCategory(Long id) {
        Category existingCategory = findCategoryById(id).orElse(null);
        if(existingCategory == null){
            return "Category does not exist";
        }else{
            categoryRepository.deleteById(id);
            return "Successfully deleted Category";
        }
    }

    @Override
    public ResponseEntity<Category> updateCategory(Long id, Category category) {
        try {
            Category existingCategory = findCategoryById(id).orElse(null);
            existingCategory.setName(category.getName());
            return saveCategory(existingCategory);
        }
        catch(Exception e){
            return null;
        }
    }


}
