const login = async ({ email, password }) => {
    console.log("login users");
}

const register = async ({ 
    name,
    email, 
    password,
    phoneNumber,
    address 
}) => {
    console.log("register users", { 
        name,
        email, 
        password,
        phoneNumber,
        address 
    });
}

export default {
    login,
    register
}