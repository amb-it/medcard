import mongoose from 'mongoose';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

let clinicDepartmentSchema = new mongoose.Schema({
    title: String,
    address: String,
    clinic: {
        type: Number,
        ref: 'Clinic'
    }
});

clinicDepartmentSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'ClinicDepartment'});

export default mongoose.model('ClinicDepartment', clinicDepartmentSchema);
