import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
    


app.use((req,res,next)=>{
    res.status(404).json({mensaje:"Ruta no encontrada"})
})
export default app;