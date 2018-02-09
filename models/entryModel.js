const mongoose = require('mongoose');
const { Schema } = mongoose;


const entryModel = new Schema({

    type: {
        type: String,
        enum: ['Receita','Despesa'],
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    description:{
        type:String
    },
    userId:{
        type:String,
        required: true
    },
    createdDate:{
        type:Date,
        default: Date.now
    }

});

mongoose.model('entry',entryModel);