import Exception from "../exceptions/Exception.js";
import { print } from "../helpers/print.js";
import { Student } from "../models/index.js";
import { faker } from '@faker-js/faker';

const getList = async({
    page,
    size,
    searchString
}) => {
    console.log("get list students");
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
    generateFakeStudents
}