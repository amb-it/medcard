import mongoose from "mongoose";
import cardType from "../../models/cardType";

async function clearCollections(collectionNames) {
    if (!collectionNames) {
        collectionNames = Object.keys(mongoose.connection.collections);
    }

    for (const el of collectionNames) {
        try {
            await mongoose.connection.collections[el].drop();

            if (el === 'cardtypes') {
                cardType._resetCount();
            }
        } catch (err) {}
    }
}

export default clearCollections;