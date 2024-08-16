import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import {EventEmitter} from "node:events";

const myEvent = new EventEmitter()
myEvent.on("event.register.user", (params) => {
    console.log(`They talked about: ${JSON.stringify(params)}`);
})

const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    await userRepository.login({email, password});

    res.status(200).json({
        message: "Login user successfully",
        data: {
            id: 1,
            name: "Thi Tit"
        }
    })
};

const register = async (req, res) => {
    const { 
        name,
        email, 
        password,
        phoneNumber,
        address 
    } = req.body;

    await userRepository.register({ 
        name,
        email, 
        password,
        phoneNumber,
        address 
    });
    myEvent.emit("event.register.user", {email, phoneNumber});

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