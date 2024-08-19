import Exception from "../exceptions/Exception.js";
import { Student } from "../models/index.js";

const getList = async({
    page,
    size,
    searchString
}) => {
    console.log("get list students");
}

const create = async({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address,
}) => {
    try {
        const newStudent = await Student.create({
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        });
        return {
            ...newStudent._doc,
        }
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception(Exception.CANNOT_CREATE_STUDENT, exception.errors);
        }
    }
}

export default {
    getList,
    create
}