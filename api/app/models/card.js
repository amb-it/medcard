import mongoose from 'mongoose';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

let cardSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    cardType: {
        type: Number,
        ref: 'CardType'
    },
    complaint: String,
    clinic: String,
    doctor: String,
    materials: String,
    notes: String,
    prescription: String,
});

cardSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Card'});

export default mongoose.model('Card', cardSchema);
