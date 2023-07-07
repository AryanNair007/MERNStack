import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("checkpoint1");
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);
        // console.log("sup, dogs yeah yup");
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;