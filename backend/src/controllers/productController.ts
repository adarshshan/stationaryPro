
import { Request, Response } from 'express';
import { products } from '../db.js';

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};
