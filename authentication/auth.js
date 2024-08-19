import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import { PATH } from "../global/path.js";

export default function checkToken(req, res, next) {
    // bypass login, register
    const lowerCaseUrl = req.url.toLowerCase().trim();
    if(lowerCaseUrl === PATH.LOGIN || lowerCaseUrl === PATH.REGISTER) {
        next();
        return;
    }
    // other request
    // get and validate token
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: error.message
        });
    }
}
