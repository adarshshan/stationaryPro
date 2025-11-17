
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  id: string;
  mobile: string;
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

export const products: Product[] = [
  {
    id: 1,
    name: 'Ballpoint Pens',
    description: 'A pack of 10 smooth writing ballpoint pens.',
    price: 5.99,
    image: 'https://i.etsystatic.com/20108887/r/il/e910f0/3679175214/il_794xN.3679175214_6ndb.jpg',
  },
  {
    id: 2,
    name: 'A4 Notebooks',
    description: 'A set of 3 A4 sized notebooks with 100 pages each.',
    price: 8.99,
    image: 'https://3.imimg.com/data3/QU/UP/MY-21545078/office-stationery-1000x1000.jpg',
  },
  {
    id: 3,
    name: 'Highlighters',
    description: 'A pack of 5 assorted color highlighters.',
    price: 4.5,
    image: 'https://scooboo.in/cdn/shop/files/soni-officemate-hi-lighter-textliner-set-highlighter-scooboosoni-officemate8906001220107pack-of-4-184179.jpg?v=1713585318&width=810',
  },
  {
    id: 4,
    name: 'Sticky Notes',
    description: 'A pad of 100 sticky notes.',
    price: 2.99,
    image: 'https://5.imimg.com/data5/PY/DH/OU/SELLER-1928854/41-dmpcmtjl-1000x1000.jpg',
  },
  {
    id: 5,
    name: 'Art Markers',
    description: 'A set of 12 dual tip art markers.',
    price: 15.99,
    image: 'https://m.media-amazon.com/images/I/81sWk+9YJmL._SX522_.jpg',
  },
];

export const users: User[] = [];
export const orders: Order[] = [];
