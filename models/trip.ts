import mongoose, {Schema} from "mongoose";

const tripSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    imageUrl1: { type: String, required: true }, 
    imageUrl2: { type: String },
    imageUrl3: { type: String },
    imageUrl4: { type: String },
    createDt: {type:Date, required: false, default : ()=>new Date((new Date()).getTime() + (420 * 60 * 1000))}, // GMT+7 is 7 hours ahead of GMT (7 * 60 minutes)
});

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default Trip;