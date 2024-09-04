import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MESSAGE } from "../global/message.js";
import { categoryRepository } from "../repositories/index.js";
import { getList } from "./helpers.js";

const getListCategories = async (req, res) => {
  await getList(req, res, categoryRepository);
};

const getDetail = async (req, res) => {
  try {
    const categoryId = req?.params?.id;
    const detailCategory = await categoryRepository.getDetail(categoryId);

    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.CATEGORY.GET_DETAIL_SUCCESSFULLY,
      data: detailCategory,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const create = async (req, res) => {
  try {
    const { parentId, name, urlKey, isActive, level, isChild } = req.body;
    const newCategory = await categoryRepository.create({
      parentId,
      name,
      urlKey,
      isActive,
      level,
      isChild,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: MESSAGE.CATEGORY.CREATED,
      data: newCategory,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
      validateErrors: exception.validationErrors,
    });
  }
};

export default {
  getList: getListCategories,
  getDetail,
  create,
};
