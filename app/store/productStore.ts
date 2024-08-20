import create from "zustand";
import { Product } from "../types/products";

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (id: string, change: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (updatedProduct) => set((state) => ({
    products: state.products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ),
  })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
  adjustStock: (id, change) => set((state) => {
    const product = state.products.find((product) => product.id === id);
    if (product) {
      const updatedProduct = {
        ...product,
        stock: product.stock + change,
        history: [
          ...(product.history || []),
          { date: new Date().toISOString(), change },
        ],
      };
      return {
        products: state.products.map((product) =>
          product.id === id ? updatedProduct : product
        ),
      };
    }
    return state;
  }),
}));
