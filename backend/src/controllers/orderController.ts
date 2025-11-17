
import { Request, Response } from 'express';
import { orders, Order } from '../db.js';

export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
  const { userId, items, total, address } = req.body;
  const newOrder: Order = {
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
