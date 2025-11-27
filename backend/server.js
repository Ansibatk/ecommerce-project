import dotenv from "dotenv";
import connectDb from "./config/db.js";
import app from "./app.js"
import connectCloudinary from "./config/cloudinary.js";
dotenv.config();
connectDb();
connectCloudinary();
app.get('/',(req,res)=>{
    res.json('api is working');
})
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
