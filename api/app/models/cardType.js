import mongoose from 'mongoose';

let cardTypeSchema = new mongoose.Schema({
  title: String
});

export default mongoose.model('CardType', cardTypeSchema);
