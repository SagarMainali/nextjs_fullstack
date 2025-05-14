import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

// let cached = global.mongoose || { conn: null, promise: null }; // this caching would not persist between hot-reloads

if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (global.mongoose.conn) return global.mongoose.conn; // return the cached db connection

    if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
    }

    // the if condition above ensures that when the concurrent function call is made, it won't create new connection
    // upon every calls rather just wait for the pending connection to be resolved and use that connection

    global.mongoose.conn = await global.mongoose.promise;
    // console.log('Database connection established!', global.mongoose.conn);
    return global.mongoose.conn;
}

export default dbConnect;
