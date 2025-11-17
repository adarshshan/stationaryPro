
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: number; quantity: number }[];
  total: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}