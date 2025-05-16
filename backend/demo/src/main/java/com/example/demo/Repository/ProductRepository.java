package com.example.demo.Repository;


import com.example.demo.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {


    // Truy vấn tuỳ chỉnh với JPQL
    @Query(value = "SELECT * FROM product WHERE id_category = :idCategory", nativeQuery = true)
    List<Product> getProductsByCategory(@Param("idCategory") Long idCategory);


}
