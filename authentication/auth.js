import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import { PATH } from "../global/path.js";
import { MESSAGE } from "../global/message.js";

export default async function checkToken(req, res, next) {
  // bypass login, register
  if (req.originalUrl === PATH.LOGIN || req.originalUrl === PATH.REGISTER) {
    next();
    return;
  }
  // other request
  // get and validate token
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: MESSAGE.TOKEN.EXPIRED,
      });
    } else {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: MESSAGE.TOKEN.INVALID,
      });
    }
  }
}
