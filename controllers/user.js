import { validationResult } from "express-validator";


const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    res.status(200).json({
        message: "Login user successfully",
        data: {
            id: 1,
            name: "Thi Tit"
        }
    })
};

const register = async (req, res) => {
    res.status(201).json({
        message: "Register user successfully"
    })
};

const getList = async (req, res) => {
    res.send("GET list users");
};

const getDetail = async (req, res) => {
    res.send("GET detail user id: " + req?.params?.id);
};

export default {
    login,
    register,
    getList,
    getDetail
}