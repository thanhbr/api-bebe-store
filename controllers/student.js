import { studentRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const getList = async (req, res) => {
    const { searchString, page, size } = req.body;
    
    await studentRepository.getList({ searchString, page, size })

    res.status(HttpStatusCode.OK).json({
        message: "Get students successfully",
        data: [
            {
                id: 1,
                name: "Thi Tit"
            },
            {
                id: 2,
                name: "Van A"
            }
        ]
    });
};

const getDetail = async (req, res) => {
    res.status(HttpStatusCode.OK).json({
        message: "GET detail successfully",
        data: {
            id: req?.params?.id ?? ""
        }
    });
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

export default {
    getList,
    getDetail,
    create,
    update
}