import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

let cardSchema = new mongoose.Schema({
    _id: Number,
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

let Card = mongoose.model('Card', cardSchema);

export {cardSchema, Card};
