const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}
module.exports = {main} ;