import Exception from "../exceptions/Exception.js";
import Brand from "../models/Brand.js";


const getList = async ({ search, page, size }) => {
    try {
        const [filterBrands, totalRecords] = await Promise.all([
            Brand.aggregate([
                {
                    $match: { 
                        $or: [
                            { name: { $regex: `.*${search}.*`, $options: "i" } },
                            { code: { $regex: `.*${search}.*`, $options: "i" } },
                            { urlKey: { $regex: `.*${search}.*`, $options: "i" } },
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
                    { code: { $regex: `.*${search}.*`, $options: "i" } },
                    { urlKey: { $regex: `.*${search}.*`, $options: "i" } },
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
        const detailBrand = await Brand.findById(brandId).select("-createdAt -updatedAt -__v");
        if(!detailBrand) {
            throw new Exception(Exception.CANNOT_FIND_BRAND_BY_ID);
        }
        return detailBrand;
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_BRAND);
    }
}

const create = async ({ code, name, urlKey, logo }) => {
    try {
        const newBrand = await Brand.create({ code, name, urlKey, logo });
        return newBrand;
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception(Exception.CANNOT_CREATE_BRAND, exception.errors);
        } else {
            throw new Exception(Exception.CANNOT_CREATE_BRAND);
        }
    }
}

const update = async ({ id, code, name, urlKey, logo }) => { 
    try {
        const updateData = {
            ...(code && { code }),
            ...(name && { name }),
            ...(urlKey && { urlKey }),
            ...(logo && { logo }),
        };

        // Check if the brand exists
        const existingBrand = await Brand.findById(id);

        if (existingBrand) {
            // Update the existing brand
            const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedBrand) {
                throw new Exception(Exception.CANNOT_UPDATE_BRAND);
            }
            return updatedBrand;
        } else {
            // Create a new brand if the ID doesn't exist
            const newBrand = await Brand.create({ ...updateData });
            return newBrand;
        }
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception(Exception.CANNOT_UPDATE_BRAND, exception.errors);
        } else {
            throw new Exception(Exception.CANNOT_UPDATE_BRAND);
        }
    }
}

const deleteBrand = async (brandId) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(brandId);
        if(!deletedBrand) {
            throw new Exception(Exception.CANNOT_DELETE_BRAND);
        }
        return deletedBrand;
    } catch (exception) {
        throw new Exception(Exception.CANNOT_DELETE_BRAND);
    }
}

const isBrandUnique = async ({ code, urlKey, id }) => {
    try {
        const query = { $or: [{ code }, { urlKey }] };
        if(id) {
            query._id = { $ne: id };
        }
        const hasBrand = await Brand.findOne(query);
        return !!hasBrand;
    } catch (error) {
        throw new Exception(Exception.CANNOT_CHECK_UNIQUE);
    }
}

export default {
    getList,
    getDetail,
    create,
    update,
    deleteBrand,
    isBrandUnique
}