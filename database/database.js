import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URL);
    print("Connected mongoose successfully", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    switch (code) {
      case 8000:
        throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
      case "ENOTFOUND":
        throw new Exception(Exception.WRONG_SERVER_NAME_DB);
      default:
        break;
    }
    throw new Exception(Exception.WRONG_CONNECT_TO_MONGOOSE);
  }
};

export default connect;
