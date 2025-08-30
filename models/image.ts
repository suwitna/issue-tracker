import mongoose, {Schema} from "mongoose";

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
})

export const Image = mongoose.models.Image || mongoose.model('Image',ImageSchema)