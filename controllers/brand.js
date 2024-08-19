import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MESSAGE } from "../global/message.js";
import { brandRepository } from "../repositories/index.js";

const create = async (req, res) => {
    try {
        const { code, name, urlKey, logo } = req.body;
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
    create
}