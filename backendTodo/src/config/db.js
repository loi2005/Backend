const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("Mongo URI is not defined");
    }
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return { success: false, message: err.message };
  }
};
module.exports = connectDB;
