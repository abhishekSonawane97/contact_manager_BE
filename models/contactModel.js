const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "User",
    },
    name: {
        type : String,
        require : [true, "Please add the contact name"],
    },
    email : {
        type : String,
        require : [ true, "Please add the contact email address"],
    },
    phone : {
        type : String,
        require : [true, "Please add the contact number"],
    },
}, {
    timeStamp : true,
});

module.exports = mongoose.model("Contact", contactSchema);