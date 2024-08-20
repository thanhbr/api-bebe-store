import Exception from "../exceptions/Exception.js";
import { print } from "../helpers/print.js";
import { Student } from "../models/index.js";
import { faker } from '@faker-js/faker';

const getList = async({ search, page, size}) => {
    try {
        const [filterStudents, totalRecords] = await Promise.all([
            Student.aggregate([
                { $match: {
                    $or: [
                        { name: { $regex: `.*${search}.*`, $options: "i" } },
                        { email: { $regex: `.*${search}.*`, $options: "i" } },
                        { phoneNumber: { $regex: `.*${search}.*`, $options: "i" } },
                    ]
                } },
                { $skip: ( page - 1 ) * size },
                { $limit: size },
                { $unset: ["__v"] }
            ]),
            Student.countDocuments({
                $or: [
                  { name: { $regex: `.*${search}.*`, $options: "i" } },
                  { email: { $regex: `.*${search}.*`, $options: "i" } },
                  { phoneNumber: { $regex: `.*${search}.*`, $options: "i" } },
                ],
            }),
        ]);
        return {
            filterStudents,
            totalRecords
        };
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_STUDENT)
    }
}

const getDetail = async(studentId) => {
    try {
        const detailStudent = await Student.findById(studentId);
        return detailStudent;
    } catch (exception) {
        throw new Exception(Exception.CANNOT_FIND_STUDENT_BY_ID)
    }
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

const update = async({
    id,
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address,
}) => {
    try {
        const updateData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(languages && { languages }),
            ...(gender && { gender }),
            ...(phoneNumber && { phoneNumber }),
            ...(address && { address }),
          };
      
        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true }); // Return the updated document

        if (!updatedStudent) {
            throw new Exception(Exception.CANNOT_UPDATE_STUDENT);
        }
        return updatedStudent;
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception(Exception.CANNOT_UPDATE_STUDENT, exception.errors);
        }
    }
}

async function generateFakeStudents() {
    try {
        [...Array(20).keys()].forEach(async (index) => {
            let fakeStudent = {
                name: `${faker.internet.userName()}-fake`,
                email: faker.internet.email(),
                languages: [faker.helpers.arrayElement(['vi', 'en'])],
                gender: faker.helpers.arrayElement(['female', 'male']),
                phoneNumber: faker.phone.imei(),
                address: faker.location.country(),
            };
            await Student.create(fakeStudent);
            print(`Created student with name ${fakeStudent.name}`);
        });
    } catch (error) {
        
    }
}

export default {
    getList,
    getDetail,
    create,
    update,
    generateFakeStudents
}