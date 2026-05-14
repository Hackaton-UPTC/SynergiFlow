const mongoose = require("mongoose");

exports.connect = (app) => {
  const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 2000,
    connectTimeoutMS: 2000,
  };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(process.env.MONGODB_URI, options)
      .then(() => {
        mongoose.connection.on("error", () => {});
        app.emit("ready");
      })
      .catch((err) => {
        console.log("MongoDB connection unsuccessful, retrying in 2 seconds.", err.message);
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};
