import mongoose from 'mongoose';
// import cardTypeSchema from 'schemas/cardTypeSchema';
// import CardType from './cardType';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

let cardSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    cardType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CardType'
    },
    complaint: String,
    clinic: String,
    doctor: String,
    materials: String,
    notes: String,
    prescription: String,
    // cardType: {},
    // visited: {},
    // diagnose: {},
    // materials: {}
});

cardSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Card'});
export default mongoose.model('Card', cardSchema);
