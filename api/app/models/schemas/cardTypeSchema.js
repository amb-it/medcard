import mongoose from 'mongoose';

let cardTypeSchema = new mongoose.Schema({
  name: String
});

export default cardTypeSchema;