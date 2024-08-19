import { studentRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { DEFAULT_SIZE_RECORD, MAX_RECORD } from "../global/constant.js";
import { MESSAGE } from "../global/message.js";

const getList = async (req, res) => {
    try {
        let { search = "", page = 1, size = DEFAULT_SIZE_RECORD } = req.query;
        page = parseInt(page);
        size = parseInt(size >= MAX_RECORD ? MAX_RECORD : size);

        const query = await studentRepository.getList({ search, page, size })
    
        res.status(HttpStatusCode.OK).json({
            message: MESSAGE.STUDENT.GET_LIST_SUCCESSFULLY,
            metadata: {
                current_page: page,
                per_page: size,
                total_item: query.totalRecords,
                total_page: Math.ceil(query.totalRecords / size)
            },
            data: query.filterStudents,
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
            message: MESSAGE.STUDENT.GET_DETAIL_SUCCESSFULLY,
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
            message: MESSAGE.STUDENT.CREATED,
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
    try {
        const { id } = req.params;
        const { name, email, languages, gender, phoneNumber, address } = req.body;

        const student = await studentRepository.update({ id, name, email, languages, gender, phoneNumber, address });
        
        if(student) {
            res.status(HttpStatusCode.INSERT_OK).json({
                message: MESSAGE.STUDENT.UPDATED,
                data: student
            });
        } else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: MESSAGE.STUDENT.NOT_FIND_ID
            })
        }
        
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
};

const generateFakeStudents = async (req, res) => {
    try {
        await studentRepository.generateFakeStudents(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: MESSAGE.STUDENT.CREATED_FAKE
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: MESSAGE.NOT_SUPPORTED
        })
    }
}

export default {
    getList,
    getDetail,
    create,
    update,
    generateFakeStudents // should be private
}