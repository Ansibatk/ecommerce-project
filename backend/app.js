import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from 'dotenv';
import cors from "cors"
const app = express();

dotenv.config();
//Middleware to handle CORS
app.use(cors());

app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);

export default app;  