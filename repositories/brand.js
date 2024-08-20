import Exception from "../exceptions/Exception.js";
import { OutputType, print } from "../helpers/print.js";
import Brand from "../models/Brand.js";

const getList = async ({ search, page, size }) => {
    try {
        const [filterBrands, totalRecords] = await Promise.all([
            Brand.aggregate([
                {
                    $match: { 
                        $or: [
                            { name: { $regex: `.*${search}.*`, $options: "i" } },
                        ]
                    }
                },
                { $skip: (page - 1) * size },
                { $limit: size }
            ]),
            Brand.countDocuments({
                $or: [
                    { name: { $regex: `.*${search}.*`, $options: "i" } },
                ]
            })
        ]);
        return {
            filterBrands, 
            totalRecords
        }
    } catch (exception) {
        throw new Exception(Exception.CANNOT_CREATE_BRAND)
    }
}

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
    getList,
    create
}