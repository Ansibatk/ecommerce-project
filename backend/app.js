import express from "express";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";

import cors from "cors"
const app = express();
//Middleware to handle CORS
app.use(cors());

app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/address",addressRoutes);
app.use("/api/userProfile",userProfileRoutes);
// app.use("/api/cartItem",cartItemRoutes);
// app.use("/api/orderItem",orderItemRoutes);
// app.use("/api/payments",paymentRoutes);



export default app;  