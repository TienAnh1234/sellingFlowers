package com.example.demo.Controller;


import com.example.demo.DTO.DtoRequest.ProductDtoRequest;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Service.CategoryService;
import com.example.demo.Service.ProductService;
import com.example.demo.Service.ProductServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping()
    public ResponseEntity<List<Product>> showAllProducts(HttpServletRequest request) {
        List<Product> products = productService.getAllProducts();
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        for(Product product : products) {
            product.setImageUrl(baseUrl + product.getImageUrl());
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/findByCategoryId/{id_category}")
    public ResponseEntity<List<Product>> showProductsByCategory(@PathVariable Long id_category) {
        return productService.getProductsByCategory(id_category);
    }

    @PostMapping("/save_product")
    public ResponseEntity<Product> saveNew(@ModelAttribute Product product, @RequestParam(value = "file") MultipartFile file) throws IOException {
        System.out.println("hanou " + product);
        return productService.saveProduct(product, file);
    }

    @PostMapping("/save_product1")
    public ResponseEntity<Product> saveNew1(@ModelAttribute ProductDtoRequest productDtoRequest, @RequestParam(value = "file") MultipartFile file) throws IOException {
        System.out.println("hanou " + productDtoRequest.getName() );
        return productService.saveProduct1(productDtoRequest, file);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id,@ModelAttribute Product product, @RequestParam(value = "file",required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(productService.updateProduct(id, product, file));
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }




}
