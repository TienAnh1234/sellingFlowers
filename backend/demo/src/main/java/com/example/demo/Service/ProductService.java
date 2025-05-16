package com.example.demo.Service;

import com.example.demo.DTO.DtoRequest.ProductDtoRequest;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> getAllProducts();

    ResponseEntity<List<Product>> getProductsByCategory(Long idCategory);

    ResponseEntity<Product> saveProduct(Product product, MultipartFile file) throws IOException;

    ResponseEntity<Product> saveProduct1(ProductDtoRequest productDtoRequest, MultipartFile file) throws IOException;

    Optional<Product> findProductById(Long id);

    Product updateProduct(Long id,Product product, MultipartFile file) throws IOException;


    String deleteProduct(Long id);




    }
