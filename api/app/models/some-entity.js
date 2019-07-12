import mongoose from 'mongoose';
import validator from 'validator';

let someEntitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    }
});

export default mongoose.model('SomeEntity', someEntitySchema);
