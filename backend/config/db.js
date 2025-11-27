import mongoose from "mongoose";
const connectDb = async () => {
    const Dburl = await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB connected');
}
export default connectDb;