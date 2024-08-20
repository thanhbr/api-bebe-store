import Exception from "../exceptions/Exception.js";
import { OutputType, print } from "../helpers/print.js";
import Brand from "../models/Brand.js";

const create = async ({ code, name, urlKey, logo }) => {
    try {
        print(urlKey, OutputType.WARNING);
        const newBrand = await Brand.create({ code, name, urlKey, logo });
        return { ...newBrand._doc }
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception(Exception.CANNOT_CREATE_BRAND, exception.errors);
        }
    }
}

export default {
    create
}