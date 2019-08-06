import mongoose from 'mongoose';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

let clinicSchema = new mongoose.Schema({
    title: String,
    address: String
});

clinicSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Clinic'});

export default mongoose.model('Clinic', clinicSchema);
