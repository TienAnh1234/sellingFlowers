package com.example.demo.Service;

import com.example.demo.DTO.DtoRequest.ProductDtoRequest;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;



    @Override
    public List<Product> getAllProducts() {
        List<Product> listProducts = productRepository.findAll();
        if (listProducts.isEmpty()) {
            return null;
        }
        return listProducts;
    }

    @Override
    public ResponseEntity<List<Product>> getProductsByCategory(Long idCategory) {
        List<Product> listProducts =  productRepository.getProductsByCategory(idCategory);
        return ResponseEntity.ok(listProducts);
    }

    @Override
    public ResponseEntity<Product> saveProduct(Product product, MultipartFile file) throws IOException {

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        if(file != null) {
            // Tạo tên file duy nhất
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Lưu file vào thư mục
            Files.write(filePath, file.getBytes());
            product.setImageUrl("/uploads/" + fileName);
        }

        if(product == null){
            return null;
        }

        return ResponseEntity.ok(productRepository.save(product));
    }

    @Override
    public ResponseEntity<Product> saveProduct1(ProductDtoRequest productDtoRequest, MultipartFile file) throws IOException {

        Category category = categoryRepository.findById(productDtoRequest.getCategoryId()).get();


        Product product = new Product(productDtoRequest);
        product.setCategory(category);

        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            imageUrl = saveFile(file);
        }

        product.setImageUrl(imageUrl);

        return ResponseEntity.ok(productRepository.save(product));
    }

    @Override
    public Optional<Product> findProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product updateProduct(Long id, Product product, MultipartFile file) throws IOException {

        Product existingProduct = findProductById(id).orElse(null);

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        if(file != null) {
            // Tạo tên file duy nhất
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Lưu file vào thư mục
            System.out.println(existingProduct.getImageUrl());
            this.deleteFile(existingProduct.getImageUrl().replace("/uploads/", ""));

            Files.write(filePath, file.getBytes());

            product.setImageUrl("/uploads/" + fileName);

        }

        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setImageUrl(product.getImageUrl().replace("http://localhost:8080", ""));
        existingProduct.setQuantity(product.getQuantity());


        return productRepository.save(existingProduct);
    }

    @Override
    public String deleteProduct(Long id) {
        Product existingProduct = findProductById(id).orElse(null);
        if(existingProduct == null){
            return "Product does not exist";
        }else{
            productRepository.deleteById(id);
            this.deleteFile(existingProduct.getImageUrl().replace("/uploads/", ""));
            return "Successfully deleted Product";
        }
    }


    public boolean deleteFile(String fileName) {
        try {
            Path filePath = Paths.get("uploads", fileName);
            Files.delete(filePath);
            return true; // Xóa thành công
        } catch (IOException e) {
            e.printStackTrace();
            return false; // Xóa thất bại
        }
    }


    private static final String UPLOAD_DIR = "uploads/";

//    @Override
//    public ResponseEntity<Product> saveProduct1(String name, Long categoryId, String description, Long price, int quantity, MultipartFile file) throws IOException {
//
//
//        Category category = categoryRepository.findById(categoryId).get();
//
//        String imageUrl = null;
//        if (file != null && !file.isEmpty()) {
//            imageUrl = saveFile(file);
//        }
//
//        Product product = new Product(name, category, description, price, quantity, imageUrl);
//
//        return ResponseEntity.ok(productRepository.save(product));
//    }
//

    private String saveFile(MultipartFile file) throws IOException {
        // Tạo thư mục lưu file nếu chưa có
        Path uploadPath = Path.of(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Tạo tên file duy nhất
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Lưu file vào thư mục
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + fileName; // Trả về đường dẫn file
    }

}
