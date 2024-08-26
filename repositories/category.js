import Exception from "../exceptions/Exception.js";
import Category from "../models/Category.js";

const getList = async ({ search, page, size }) => {
    try {
        const [filterCategories, totalRecords] = await Promise.all([
            Category.aggregate([
                {
                    $match: { 
                        $or: [
                            { name: { $regex: `.*${search}.*`, $options: "i" } },
                            { urlKey: { $regex: `.*${search}.*`, $options: "i" } },
                        ]
                    }
                },
                { $skip: (page - 1) * size },
                { $limit: size },
                { $unset: ["createdAt", "updatedAt", "__v"] }
            ]),
            Category.countDocuments({
                $or: [
                    { name: { $regex: `.*${search}.*`, $options: "i" } },
                    { urlKey: { $regex: `.*${search}.*`, $options: "i" } },
                ]
            })
        ]);
        return {
            filterCategories, 
            totalRecords
        }
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_CATEGORY);
    }
}

const getDetail = async (categoryId) => {
    try {
        const detailCategory = await Category.findById(categoryId).select("-createdAt -updatedAt -__v");
        if(!detailCategory) {
            throw new Exception(Exception.CANNOT_FIND_CATEGORY_BY_ID);
        }
        return detailCategory;
    } catch (exception) {
        throw new Exception(Exception.CANNOT_GET_CATEGORY);
    }
}

const create = async ({ parentId, name, urlKey, isActive, level, isChild }) => {
    try {
        const newCategory = await Category.create({ parentId, name, urlKey, isActive, level, isChild });
        return newCategory;
    } catch (exception) {
        if(!!exception.errors) {
            throw new Exception(Exception.CANNOT_CREATE_CATEGORY, exception.errors);
        } else {
            throw new Exception(Exception.CANNOT_CREATE_CATEGORY);
        }
    }
}

export default {
    getList,
    getDetail,
    create
}