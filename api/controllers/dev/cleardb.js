import mongoose from "mongoose";

async function clearDb() {
    const collections = Object.keys(mongoose.connection.collections);
    
    for (const el of collections) {
        try {
            await mongoose.connection.collections[el].drop();
        } catch (err) {}
    }
}

export default clearDb;