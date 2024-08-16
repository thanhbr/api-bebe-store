import { studentRepository } from "../repositories/index.js";

const getList = async (req, res) => {
    const { searchString, page, size } = req.body;
    
    await studentRepository.getList({ searchString, page, size })

    res.status(200).json({
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
    res.status(200).json({
        message: "GET detail successfully",
        data: {
            id: req?.params?.id ?? ""
        }
    });
};

const create = async(req, res) => {
    res.status(201).json({
        message: "Created student successfully",
        id: req?.params?.id ?? ""
    });
};

const update = async (req, res) => {
    res.status(201).json({
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