import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { DEFAULT_SIZE_RECORD, MAX_RECORD } from "../global/constant.js";
import { MESSAGE } from "../global/message.js";
import { categoryRepository } from "../repositories/index.js";

const getList = async (req, res) => {
    try {
        let { search = "", page = 1, size = DEFAULT_SIZE_RECORD } = req.query;
        page = parseInt(page);
        size = parseInt(size >= MAX_RECORD ? MAX_RECORD : size);
        const query = await categoryRepository.getList({ search, page, size });
        
        res.status(HttpStatusCode.OK).json({
            message: MESSAGE.CATEGORY.GET_LIST_SUCCESSFULLY,
            metadata: {
                current_page: page,
                per_page: size,
                total_item: query.totalRecords,
                total_page: Math.ceil(query.totalRecords / size)
            },
            data: query.filterCategories,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const getDetail = async (req, res) => {
    try {
        const categoryId = req?.params?.id;
        const detailCategory = await categoryRepository.getDetail(categoryId);
        
        res.status(HttpStatusCode.OK).json({
            message: MESSAGE.CATEGORY.GET_DETAIL_SUCCESSFULLY,
            data: detailCategory
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const create = async (req, res) => {
    try {
        const { parentId, name, urlKey, isActive, level, isChild } = req.body;
        const newCategory = await categoryRepository.create({ parentId, name, urlKey, isActive, level, isChild });
        res.status(HttpStatusCode.INSERT_OK).json({
            message: MESSAGE.CATEGORY.CREATED,
            data: newCategory
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
            validateErrors: exception.validationErrors
        })
    }
}

export default {
    getList,
    getDetail,
    create
}