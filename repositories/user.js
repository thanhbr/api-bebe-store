import { print, OutputType } from "../helpers/print.js"
import User from "../models/User.js";
import Exception from './../exceptions/Exception.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async ({ email, password }) => {
    const existingUser = await User.findOne({email}).exec();
    if(existingUser) {
        // encrypt password, use bcrypt
        const isMatched = await bcrypt.compare(password, existingUser.password);
        if(!!isMatched) {
            // create JWS
            const activeUser = {
                ...existingUser.toObject(),
                password: "",
            }
            const token = jwt.sign({
                data: activeUser
            }, process.env.JWT_SECRET,
            { expiresIn: '1h' });
            return {
                ...activeUser,
                token,
            }
        } else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }
    }
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
}

const register = async ({ 
    name,
    email, 
    password,
    phoneNumber,
    address 
}) => {
    const existingUser = await User.findOne({ email }).exec();
    if(!!existingUser) {
        throw new Exception(Exception.USER_EXIST)
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY));

    // insert db
    const newUser = await User.create({
        name,
        email, 
        password: hashedPassword,
        phoneNumber,
        address 
    })
    return {
        ...newUser._doc,
        password: "",
    };
}

export default {
    login,
    register
}