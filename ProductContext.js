// ProductContext.js
import React, { createContext, useContext, useState } from "react";
import { products as productData } from "./data";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const searchProducts = (keyword) => {
    if (!keyword.trim()) {
      setFilteredProducts(allProducts);
      return;
    }

    const result = allProducts.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
    );

    setFilteredProducts(result);
  };

  const filterByCategory = (category) => {
    if (!category) {
      setFilteredProducts(allProducts);
      return;
    }

    const result = allProducts.filter((item) => item.category === category);
    setFilteredProducts(result);
  };

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        filteredProducts,
        searchProducts,
        filterByCategory,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};