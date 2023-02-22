// import mongoose 
import mongoose from "mongoose";
 
// Buat Schema
const Data = mongoose.Schema({
    ts:{
        type: Number,
        required: false
    },
    values:{
        type: Object,
        required: true
    }
});

// export model
export default mongoose.model('Datas', Data);