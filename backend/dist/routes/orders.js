import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protect, getOrders);
router.post('/', protect, createOrder);
export default router;
//# sourceMappingURL=orders.js.map