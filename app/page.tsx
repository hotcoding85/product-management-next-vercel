import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Box, Container, Heading } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import ThemeToggleButton from "./components/ThemeToggleButton";
export default function Home() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" textAlign={'center'} p={4}>
        <Heading as="h1" mb={4}>Inventory Tracking App <ThemeToggleButton /></Heading>
        <ProductForm />
        <ProductList />
      </Container>
    </ChakraProvider>
  );
}