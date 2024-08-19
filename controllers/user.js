import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import {EventEmitter} from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MESSAGE } from "../global/message.js";

const myEvent = new EventEmitter()
myEvent.on("event.register.user", (params) => {
    console.log(`They talked about: ${JSON.stringify(params)}`);
})

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    
        const { email, password } = req.body;
        const existingUser = await userRepository.login({email, password});
    
        res.status(HttpStatusCode.OK).json({
            message: MESSAGE.USER.LOGIN_SUCCESSFULLY,
            data: existingUser
        })
        
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
};

const register = async (req, res) => {
    const { 
        name,
        email, 
        password,
        phoneNumber,
        address 
    } = req.body;

    try {
        myEvent.emit("event.register.user", {email, phoneNumber});
        const user = await userRepository.register({ name, email, password, phoneNumber, address });
        res.status(HttpStatusCode.INSERT_OK).json({
            message: MESSAGE.USER.REGISTER_SUCCESSFULLY,
            data: user
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        });
    }
};

const getList = async (req, res) => {
    res.status(HttpStatusCode.OK).json({
        message: MESSAGE.USER.GET_LIST_SUCCESSFULLY,
        data: [],
    });
};

const getDetail = async (req, res) => {
    res.status(HttpStatusCode.OK).json({
        message: MESSAGE.USER.GET_DETAIL_SUCCESSFULLY,
        data: {
            id: req?.params?.id
        },
    });
};

export default {
    login,
    register,
    getList,
    getDetail
}