
import { Router } from 'express';
import { getProducts } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getProducts);

export default router;
