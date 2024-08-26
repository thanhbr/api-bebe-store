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
        total_page: Math.ceil(query.totalRecords / size),
      },
      data: query.filterBrands,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const brandId = req?.params?.id;
    const detailBrand = await brandRepository.getDetail(brandId);

    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.BRAND.GET_DETAIL_SUCCESSFULLY,
      data: detailBrand,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const create = async (req, res) => {
  try {
    const { code, name, urlKey, logo } = req.body;
    const hasBrand = await brandRepository.isBrandUnique({ code, urlKey });
    if (hasBrand) {
      res.status(HttpStatusCode.CONFLICT).json({
        message: MESSAGE.BRAND.EXIST,
      });
      return;
    }
    const newBrand = await brandRepository.create({ code, name, urlKey, logo });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: MESSAGE.BRAND.CREATED,
      data: newBrand,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
      validateErrors: exception.validationErrors,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, urlKey, logo } = req.body;
    const hasBrand = await brandRepository.isBrandUnique({ code, urlKey, id });
    if (hasBrand) {
      res.status(HttpStatusCode.CONFLICT).json({
        message: MESSAGE.BRAND.EXIST,
      });
      return;
    }

    const updatedBrand = await brandRepository.update({
      id,
      code,
      name,
      urlKey,
      logo,
    });
    if (!updatedBrand) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: MESSAGE.BRAND.NOT_FIND_ID,
      });
      return;
    }
    res.status(HttpStatusCode.INSERT_OK).json({
      message: MESSAGE.BRAND.UPDATED,
      data: updatedBrand,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
      validatorErrors: exception.validationErrors,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await brandRepository.deleteBrand(id);
    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.BRAND.DELETED,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  getList,
  getDetail,
  create,
  update,
  deleteBrand,
};
