import mongoose from 'mongoose';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

let cardSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    cardType: {
        type: Number,
        ref: 'CardType'
    },
    complaint: String,
    clinic: {
        type: Number,
        ref: 'Clinic'
    },
    clinicDepartment: {
        type: Number,
        ref: 'ClinicDepartment'
    },
    doctor: {
        type: Number,
        ref: 'Doctor'
    },
    diagnoses: String,
    materials: String,
    prescriptions: String,
    notes: String
});

cardSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Card'});

export default mongoose.model('Card', cardSchema);
