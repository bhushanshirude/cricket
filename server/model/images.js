const mongoose = require("mongoose");
const cloth = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }

});
module.exports = mongoose.model("cloth", cloth);