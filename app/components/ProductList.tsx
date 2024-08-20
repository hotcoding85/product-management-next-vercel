"use client";

import { SimpleGrid, Box } from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const products = useProductStore((state) => state.products);

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} p={4}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}
