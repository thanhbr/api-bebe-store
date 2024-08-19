import { studentRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MAX_RECORD } from "../global/constant.js";

const getList = async (req, res) => {
    try {
        let { search = "", page = 1, size = MAX_RECORD } = req.query;
        size = size >= MAX_RECORD ? MAX_RECORD : size;

        const filterStudents = await studentRepository.getList({ search, page, size })
    
        res.status(HttpStatusCode.OK).json({
            message: "Get students successfully",
            size: filterStudents.length,
            size1: size,
            page: page,
            search: search,
            data: filterStudents
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

const getDetail = async (req, res) => {
    try {
        const studentId = req?.params?.id ?? "";
        const detailStudent = await studentRepository.getDetail(studentId)
        
        res.status(HttpStatusCode.OK).json({
            message: "GET detail successfully",
            data: detailStudent
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
};

const create = async(req, res) => {
    try {
        const { name, email, languages, gender, phoneNumber, address } = req.body;
        const newStudent = await studentRepository.create({ name, email, languages, gender, phoneNumber, address });

        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Created student successfully",
            data: newStudent,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
            validationErrors: exception.validationErrors
        });
    }
};

const update = async (req, res) => {
    res.status(HttpStatusCode.INSERT_OK).json({
        message: "PATCH(create new object if not exists)",
        id: req?.params?.id ?? ""
    });
};

const generateFakeStudents = async (req, res) => {
    try {
        await studentRepository.generateFakeStudents(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Created fake student successfully"
        });
    } catch (error) {
        
    }
}

export default {
    getList,
    getDetail,
    create,
    update,
    generateFakeStudents // should be private
}