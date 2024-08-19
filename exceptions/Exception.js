import { MESSAGE } from "../global/message.js";
import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = MESSAGE.DB.WRONG_ACCOUNT;
    static WRONG_SERVER_NAME_DB = MESSAGE.DB.WRONG_SERVER;
    static WRONG_CONNECT_TO_MONGOOSE = MESSAGE.DB.FAILED_CONNECT;
    static USER_EXIST = MESSAGE.USER.EXIST;
    static CANNOT_REGISTER_USER = MESSAGE.USER.NOT_REGISTER;
    static WRONG_EMAIL_OR_PASSWORD = MESSAGE.USER.WRONG_ACCOUNT;
    static CANNOT_CREATE_STUDENT = MESSAGE.STUDENT.FAILED_CREATE;
    static CANNOT_UPDATE_STUDENT = MESSAGE.STUDENT.FAILED_UPDATE;
    static CANNOT_FIND_STUDENT_BY_ID = MESSAGE.STUDENT.NOT_FIND_ID;
    static CANNOT_GET_STUDENT = MESSAGE.STUDENT.GET_LIST_FAILED;
    
    constructor(message, validationErrors={}) {
        super(message);
        print(message, OutputType.ERROR);
        this.validationErrors = validationErrors;
    }
}