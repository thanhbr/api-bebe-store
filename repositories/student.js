const getList = async({
    page,
    size,
    searchString
}) => {
    console.log("get list students");
}

const create = async({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address,
}) => {
    console.log("create student");
    return { name }
}

export default {
    getList,
    create
}