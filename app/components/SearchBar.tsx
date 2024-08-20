import { useState } from "react";
import { Input, Box, SimpleGrid } from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";
import ProductItem from "./ProductItem";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const products = useProductStore((state) => state.products);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box maxWidth="500px" mx="auto" p={4}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Products"
        mb={4}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
