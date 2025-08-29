const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const mongoURI = process.env.MONGODB_URI; // Full URI from Render env vars

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // You can specify dbName here if not included in URI
    dbName: "scatch",
  })
  .then(() => {
    dbgr("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    dbgr("❌ MongoDB connection error:", err);
  });

module.exports = mongoose.connection;
