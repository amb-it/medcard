import mongoose from 'mongoose';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';
import findOrCreate from "mongoose-findorcreate";

let clinicSchema = new mongoose.Schema({
    title: String,
    address: String
});

clinicSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Clinic'});
clinicSchema.plugin(findOrCreate);

export default mongoose.model('Clinic', clinicSchema);
