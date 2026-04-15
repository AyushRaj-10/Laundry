// server.js
import app from "./app.js";
import config from "./config/index.js";
import mongoConnection from "./config/db.js";
import logger from "./config/logger.js";
import dotenv from "dotenv";

dotenv.config();


const startServer = async () => {
  try {
    await mongoConnection.connect();

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });

  } catch (error) {
    logger.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();