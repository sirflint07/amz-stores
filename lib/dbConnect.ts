import { error } from "console";
import mongoose from "mongoose";

async function dbConnect () {
    try {
        await mongoose.connect(process.env.MONGO_DBURI!)
    } catch(error) {
        throw new Error('error in connection')
    }
}

export default dbConnect