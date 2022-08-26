const mongoose = require("mongoose");
require("dotenv").config();

let CONNECTION_URL;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  CONNECTION_URL = process.env.MONGO_URL;
} else if (process.env.NODE_ENV === "production") {
  CONNECTION_URL = process.env.MONGO_URL_PRODUCTION;
}

mongoose.connection.once("open", () => {
  console.log(
    `Successfully connected to the ${process.env.NODE_ENV} Database!`
  );
});

mongoose.connection.on("error", (error) => {
  console.log("There was an error connecting to the database!");
  console.log(error);
});

async function mongoConnect() {
  await mongoose.connect(CONNECTION_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
