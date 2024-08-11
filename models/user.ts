import { timeStamp } from "console";
import mongoose, {Schema} from "mongoose";
/*
const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        cardID: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
*/

const userSchema = new Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true }, 
    cardID: { type: String, required: true }, 
    phoneNo: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {type: String, required: false, default : "user"},
    createDt: {type:Date, required: false, default : ()=>new Date((new Date()).getTime() + (420 * 60 * 1000))}, // GMT+7 is 7 hours ahead of GMT (7 * 60 minutes)
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;