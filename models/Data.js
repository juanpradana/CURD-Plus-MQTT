// import mongoose 
import mongoose from "mongoose";
 
// Buat Schema
const Data = mongoose.Schema({
    key:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    }
});
 
// export model
export default mongoose.model('Datas', Data);