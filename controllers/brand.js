import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { DEFAULT_SIZE_RECORD, MAX_RECORD } from "../global/constant.js";
import { MESSAGE } from "../global/message.js";
import { brandRepository } from "../repositories/index.js";

const getList = async (req, res) => {
    try {
        let { search = "", page = 1, size = DEFAULT_SIZE_RECORD } = req.query;
        page = parseInt(page);
        size = parseInt(size >= MAX_RECORD ? MAX_RECORD : size);
        const query = await brandRepository.getList({ search, page, size });
        
        res.status(HttpStatusCode.OK).json({
            message: MESSAGE.BRAND.GET_LIST_SUCCESSFULLY,
            metadata: {
                current_page: page,
                per_page: size,
                total_item: query.totalRecords,
                total_page: Math.ceil(query.totalRecords / size)
            },
            data: query.filterBrands,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const create = async (req, res) => {
    try {
        const { code, name, urlKey, logo } = req.body;
        const hasBrand = await brandRepository.isBrandUnique({ code, urlKey });
        if(hasBrand) {
            res.status(HttpStatusCode.CONFLICT).json({
                message: MESSAGE.BRAND.EXIST
            });
            return;
        }
        const newBrand = await brandRepository.create({ code, name, urlKey, logo });
        res.status(HttpStatusCode.INSERT_OK).json({
            message: MESSAGE.BRAND.CREATED,
            data: newBrand
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }
}

export default {
    getList,
    create
}