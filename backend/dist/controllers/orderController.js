import { orders } from '../db.js';
export const getOrders = (req, res) => {
    res.json(orders);
};
export const createOrder = (req, res) => {
    const { userId, items, total, address } = req.body;
    const newOrder = {
        id: Date.now().toString(),
        userId,
        items,
        total,
        address,
        status: 'Pending',
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
};
//# sourceMappingURL=orderController.js.map