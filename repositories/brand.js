import Exception from "../exceptions/Exception.js";
import { OutputType, print } from "../helpers/print.js";
import Brand from "../models/Brand.js";

// kiểm tra hàm getList đúng hay không 
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
                { $limit: size },
                { $unset: ["createdAt", "updatedAt", "__v"] }
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
        throw new Exception(Exception.CANNOT_GET_BRAND);
    }
}

const getDetail = async (brandId) => {
    try {
        const detailBrand = await Brand.findById(brandId);
        return detailBrand;
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_BRAND);
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

const update = async ({ id, code, name, urlKey, logo }) => { // Add 'id' parameter
    try {
        const updateData = {
            ...(code && { code }),
            ...(name && { name }),
            ...(urlKey && { urlKey }),
            ...(logo && { logo }),
        };

        const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true }); // Return the updated document

        if (!updatedBrand) {
            throw new Exception("Cannot update brand");
        }
        return updatedBrand;
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception("Cannot update brand", exception.errors);
        }
    }
}

const isBrandUnique = async ({ code, urlKey }) => {
    try {
        const hasBrand = await Brand.findOne({ $or: [{ code }, { urlKey }] });
        return !!hasBrand;
    } catch (error) {
        throw new Exception("Cannot check brand uniqueness"); // Use the correct exception
    }
}

export default {
    getList,
    getDetail,
    create,
    isBrandUnique
}