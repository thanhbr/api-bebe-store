import { User } from "../models/index.js";
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
            { expiresIn: '8h' });
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
    try {
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
    } catch (exception) {
        throw new Exception(Exception.CANNOT_REGISTER);
    }
}

const getList = async ({ search, page, size }) => {
    try {
        const [filterUsers, totalRecords] = await Promise.all([
            User.aggregate([
                { 
                    $match: {
                        $or: [   
                            { name: { $regex: `.*${search}.*`, $options: "i" } },
                            { email: { $regex: `.*${search}.*`, $options: "i" } },
                            { phoneNumber: { $regex: `.*${search}.*`, $options: "i" } },
                        ]
                    }
                },
                { $skip: (page - 1) * size },
                { $limit: size },
                { $unset: ["createdAt", "updatedAt", "__v"] }
            ]),
            User.countDocuments({
                $or: [
                  { name: { $regex: `.*${search}.*`, $options: "i" } },
                  { email: { $regex: `.*${search}.*`, $options: "i" } },
                  { phoneNumber: { $regex: `.*${search}.*`, $options: "i" } },
                ],
            }),
        ]);
        return {
            filterUsers, 
            totalRecords
        }
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_USER);
    }
}

const getDetail = async (userId) => {
    try {
        const detailUser = await User.findById(userId).select("-__v");
        if(!detailUser) {
            throw new Exception(Exception.CANNOT_GET_DETAIL_USER);
        }
        return detailUser;
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_DETAIL_USER);
    }
}

const update = async ({ id, name, email, password, phoneNumber, address, role }) => {
    try {
        const updatedData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password }),
            ...(phoneNumber && { phoneNumber }),
            ...(address && { address }),
            ...(role && { role }),
        }

        const existUser = User.findById(id);
        if(!existUser) {
            const newUser = User.create(updatedData);
            return newUser;
        } else {
            const updatedUser = User.findByIdAndUpdate(id, updatedData, { new: true }).select("-updatedAt -__v");
            if(!updatedUser) {
                throw new Exception(Exception.CANNOT_UPDATE_USER);
            }
            return updatedUser;
        }
    } catch (exception) {
        throw new Exception(Exception.CANNOT_UPDATE_USER)
    }
}

const isUserUnique = async ({ id, email, phoneNumber }) => {
    try {
        const query = { $or: [{ phoneNumber }, { phoneNumber }] };
        if(id) {
            query._id = { $ne: id };
        }
        const hasUser = await User.findOne(query);
        return !!hasUser;
    } catch (error) {
        throw new Exception(Exception.CANNOT_CHECK_UNIQUE);
    }
}

export default {
    login,
    register,
    getList,
    getDetail,
    update,
    isUserUnique
}