import { Schema, models, model } from "mongoose";


const UserSchema = new Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
        password: { type: String }, // only for credentials users
    },
    { timestamps: true }
);
export default models.User || model("User", UserSchema);
