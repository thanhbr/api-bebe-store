export const MESSAGE = {
    DB: {
        WRONG_ACCOUNT: "Incorrect database username or password",
        WRONG_SERVER: "Incorrect server name or connection string",
        FAILED_CONNECT: "Error connecting to Mongoose database",
    },
    USER: {
        LOGIN_SUCCESSFULLY: "Login user successfully",
        WRONG_ACCOUNT: "Incorrect email or password",
        EXIST: "User already exists",
        REGISTER_SUCCESSFULLY: "Login user successfully",
        NOT_REGISTER: "Cannot register user",
        GET_LIST_SUCCESSFULLY: "Get users successfully",
        GET_DETAIL_SUCCESSFULLY: "Get detail user successfully",
    },
    STUDENT: {
        GET_LIST_FAILED: "Cannot get students",
        GET_LIST_SUCCESSFULLY: "Get students successfully",
        GET_DETAIL_SUCCESSFULLY: "Get detail successfully",
        NOT_FIND_ID: "Cannot find student by id",
        UPDATED: "Updated student successfully",
        FAILED_UPDATE: "Cannot update student",
        CREATED: "Created student successfully",
        CREATED_FAKE: "Created fake student successfully",
        FAILED_CREATE: "Cannot create student",
    },
    BRAND: {
        EXIST: "Code or urlKey already exists",
        CREATED: "Created brand successfully",
        UPDATED: "Updated brand successfully",
        FAILED_CREATE: "Cannot create brand",
        FAILED_UPDATE: "Cannot update brand",
        GET_DETAIL_SUCCESSFULLY: "Get detail brand successfully",
        GET_LIST_SUCCESSFULLY: "Get brands successfully",
        GET_LIST_FAILED: "Cannot get brands",
        CANNOT_CHECK_UNIQUE: "Cannot check brand uniqueness",
        NOT_FIND_ID: "Cannot find brand by id",
    },
    TOKEN: {
        EXPIRED: "Token expired",
        INVALID: "Invalid token",
    },
    NOT_SUPPORTED: "not supported!!!"
}