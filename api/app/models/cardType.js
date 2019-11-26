import mongoose from 'mongoose';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

let cardTypeSchema = new mongoose.Schema({
  title: String
});

cardTypeSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'CardType'});

export default mongoose.model('CardType', cardTypeSchema);
