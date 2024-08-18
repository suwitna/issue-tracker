import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    photo1: { type: Image, required: true }, 
    photo2: { type: Image, required: true }, 
    photo3: { type: Image, required: true }, 
    photo4: { type: Image, required: true }, 
    createDt: {type:Date, required: false, default : ()=>new Date((new Date()).getTime() + (420 * 60 * 1000))}, // GMT+7 is 7 hours ahead of GMT (7 * 60 minutes)
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;