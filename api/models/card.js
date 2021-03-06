import mongoose from 'mongoose';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

mongoose.set('useFindAndModify', false);

let cardSchema = new mongoose.Schema({
    user: {
        type: Number,
        ref: 'User'
    },
    date: { type: Date, default: Date.now },
    cardType: {
        type: Number,
        ref: 'CardType'
    },
    tags: [String],
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
    notes: String,
    files: [String],
    deleted_at: { type: Date }
});

cardSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Card'});

export default mongoose.model('Card', cardSchema);
