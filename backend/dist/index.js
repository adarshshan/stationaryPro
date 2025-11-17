import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map