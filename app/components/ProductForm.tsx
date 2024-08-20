"use client";

import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import { Product } from "../types/products";
import { useProductStore } from "../store/productStore";

interface ProductFormProps {
  productToEdit?: Product; // Optional prop for editing
  onClose?: () => void;   // Optional callback to close the form
}

export default function ProductForm({ productToEdit, onClose }: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const toast = useToast();

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
    }
  }, [productToEdit]);

  const validateForm = (): boolean => {
    return name !== "" && price > 0 && stock >= 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please ensure all fields are filled correctly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (productToEdit) {
      const updatedProduct: Product = {
        ...productToEdit,
        name,
        description,
        price,
        stock,
      };
      updateProduct(updatedProduct);
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name,
        description,
        price,
        stock,
        history: [],
      };
      addProduct(newProduct);
      toast({
        title: "Product Added",
        description: "The product has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    // Reset form fields
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    if (onClose) onClose();
  };

  return (
    <Box maxWidth="500px" mx="auto" p={4} borderWidth={1} borderRadius="md">
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <NumberInput
          value={price}
          onChange={(valueString) => setPrice(parseFloat(valueString))}
          min={0}
          precision={2}
        >
          <NumberInputField placeholder="Price" />
        </NumberInput>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Stock</FormLabel>
        <NumberInput
          value={stock}
          onChange={(valueString) => setStock(parseInt(valueString))}
          min={0}
        >
          <NumberInputField placeholder="Stock Level" />
        </NumberInput>
      </FormControl>
      <Button colorScheme="teal" width="full" onClick={handleSubmit}>
        {productToEdit ? "Update Product" : "Add Product"}
      </Button>
    </Box>
  );
}
