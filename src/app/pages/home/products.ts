export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
  export const products = [
    {
      id: 1,
      name: 'Phone XL',
      price: 799,
      description: 'Compra'
    },
    {
      id: 2,
      name: 'Phone Mini',
      price: 699,
      description: 'Venta'
    },
    {
      id: 3,
      name: 'Phone Standard',
      price: 299,
      description: 'Venta'
    }
  ];
  