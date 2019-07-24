import mongoose from 'mongoose';
// import cardTypeSchema from 'schemas/cardTypeSchema';
// import CardType from './cardType';

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

export default mongoose.model('Card', cardSchema);
