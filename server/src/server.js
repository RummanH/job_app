const http = require("http");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(`Uncaught exception: ${err.name}, ${err.message}`);
  console.log("App is shutting down...");
  process.exit(1);
});

const { mongoConnect } = require("./services/mongo");

const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}....`);
    });
  } catch (err) {
    console.log("There was an error starting the server!");
  }
})();

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection: ${err.name} ${err.message}`);
  console.log("App is shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
