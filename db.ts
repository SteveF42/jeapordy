const mongoose = require('mongoose')


const db = {
    conn: null,
    promise: null
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
}

export async function dbConnect() {
    if (db && db.conn) {
        // console.log('returning previous db');
        return db.conn;
    }
    const conString = process.env.MONGO_URL;
    const promise = mongoose.connect(conString, options);
    db.conn = await promise;
    db.promise = promise;

    console.log('connected');
    return await promise;
}