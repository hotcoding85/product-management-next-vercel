"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Box, Button, Stack, Input, FormControl, FormLabel } from "@chakra-ui/react";
import ProductForm from "./components/ProductForm";
import ProductItem from "./components/ProductItem";
import { useProductStore } from "./store/productStore";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { Product } from "./types/products";

export default function Home() {
  const { products, searchTerm, setSearchTerm } = useProductStore((state) => ({
    products: state.products,
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
  }));
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider>
      <Box p={4}>
        <ThemeToggleButton />
        <FormControl mb={6} mt={4}>
          <FormLabel htmlFor="search">Search Products</FormLabel>
          <Input
            id="search"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={() => setShowForm(true)} mb={4}>
          Add New Product
        </Button>
        {showForm && (
          <ProductForm productToEdit={editingProduct} onClose={handleCloseForm} />
        )}
        <Stack spacing={4}>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
