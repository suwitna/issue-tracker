import mongoose from "mongoose";
/*
declare global {
    var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("Connected to MongoDB: ", MONGODB_URI);
if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  
    return cached.conn; 
}
*/
const MONGODB_URI = process.env.MONGODB_URI!;
console.log("Connected to MongoDB: ", MONGODB_URI);
if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
}

export async function dbConnect () {
    try {
        const connection = await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB: ", MONGODB_URI);
        return connection;

    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}
