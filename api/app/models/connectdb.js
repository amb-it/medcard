import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const connectDb = () => {
    return mongoose.connect(process.env.MONGO_DATABASE_URL, {useNewUrlParser: true});
};

autoIncrement.initialize(mongoose.connection);

export default connectDb;
