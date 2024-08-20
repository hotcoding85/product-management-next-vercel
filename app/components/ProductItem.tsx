"use client";

import { Box, Text, Button, Stack, Input, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import { Product } from "../types/products";
import { useProductStore } from "../store/productStore";
import { useState } from "react";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const adjustStock = useProductStore((state) => state.adjustStock);
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleUpdate = () => {
    updateProduct(editedProduct);
    setIsEditing(false);
    toast({
      title: "Product Updated",
      description: "The product has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
      {isEditing ? (
        <>
          <Input
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            placeholder="Product Name"
            mb={2}
          />
          <Input
            value={editedProduct.description}
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            placeholder="Product Description"
            mb={2}
          />
          <NumberInput
            value={editedProduct.price}
            onChange={(valueString) => setEditedProduct({ ...editedProduct, price: parseFloat(valueString) })}
            min={0}
            precision={2}
            mb={2}
          >
            <NumberInputField placeholder="Price" />
          </NumberInput>
          <NumberInput
            value={editedProduct.stock}
            onChange={(valueString) => setEditedProduct({ ...editedProduct, stock: parseInt(valueString) })}
            min={0}
            mb={2}
          >
            <NumberInputField placeholder="Stock Level" />
          </NumberInput>
          <Button colorScheme="blue" onClick={handleUpdate} mr={2}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
          <Text mt={2}>{product.description}</Text>
          <Text mt={2}>Price: ${product.price.toFixed(2)}</Text>
          <Text mt={2}>Stock: {product.stock}</Text>
          <Stack direction="row" mt={4}>
            <Button colorScheme="green" onClick={() => adjustStock(product.id, 1)}>+ Stock</Button>
            <Button colorScheme="red" onClick={() => adjustStock(product.id, -1)}>- Stock</Button>
            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button colorScheme="red" onClick={() => deleteProduct(product.id)}>Delete</Button>
          </Stack>
          <Box mt={4}>
            <Text fontWeight="bold">Inventory History</Text>
            {product.history?.map((entry, index) => (
              <Text key={index}>{entry.date}: {entry.change > 0 ? `+${entry.change}` : entry.change}</Text>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
