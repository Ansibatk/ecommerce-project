import dotenv from "dotenv";
import connectDb from "./config/db.js";
import app from "./app.js"
dotenv.config();
connectDb();
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
