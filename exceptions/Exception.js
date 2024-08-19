import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
    static WRONG_SERVER_NAME_DB = "Wrong server name/connection string";
    static WRONG_CONNECT_TO_MONGOOSE = "Cannot connect to Mongoose";
    static USER_EXIST = "User already exists";
    static CANNOT_REGISTER_USER = "Cannot register user";
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password";
    static CANNOT_CREATE_STUDENT = "Cannot create student";
    static CANNOT_UPDATE_STUDENT = "Cannot update student";
    static CANNOT_FIND_STUDENT_BY_ID = "Cannot find student by id";
    static CANNOT_GET_STUDENT = "Cannot get student";
    
    constructor(message, validationErrors={}) {
        super(message);
        print(message, OutputType.ERROR);
        this.validationErrors = validationErrors;
    }
}