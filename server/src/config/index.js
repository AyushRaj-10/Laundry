/* The code you provided is attempting to import the `dotenv` package in a JavaScript file. The
`dotenv` package is commonly used in Node.js applications to load environment variables from a
`.env` file into `process.env`. */
import dotenv from "dotenv";
dotenv.config();

const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  mongo: {
    uri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB_NAME
  }
};

export default config;