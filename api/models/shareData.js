import mongoose from 'mongoose';

let shareDataSchema = new mongoose.Schema({
    _id: Number,
    code: String
});

let ShareData = mongoose.model('ShareData', shareDataSchema);

export {shareDataSchema, ShareData};