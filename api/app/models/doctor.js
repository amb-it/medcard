import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

let doctorSchema = new mongoose.Schema({
    name: String,
    surname: String,
    title: String,
    clinic: {
        type: Number,
        ref: 'Clinic'
    }
});

doctorSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Doctor'});
doctorSchema.plugin(findOrCreate);

export default mongoose.model('Doctor', doctorSchema);
