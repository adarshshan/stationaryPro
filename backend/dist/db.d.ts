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
    items: {
        productId: number;
        quantity: number;
    }[];
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
export declare const products: Product[];
export declare const users: User[];
export declare const orders: Order[];
//# sourceMappingURL=db.d.ts.map