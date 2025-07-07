import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    name: string,
    email: string;
    pictureUrl : String 

}

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    pictureUrl : {type : String}
});

const UsersModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UsersModel;