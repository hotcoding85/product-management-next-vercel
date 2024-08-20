export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    history?: InventoryChange[];
  }
  
  export interface InventoryChange {
    date: string;
    change: number;
  }
  