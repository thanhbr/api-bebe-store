import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { DEFAULT_SIZE_RECORD, MAX_RECORD } from "../global/constant.js";
import { MESSAGE } from "../global/message.js";

export const getList = async (req, res, repository, searchKey = "search") => {
  try {
    let { search = "", page = 1, size = DEFAULT_SIZE_RECORD } = req.query;
    page = parseInt(page);
    size = parseInt(size >= MAX_RECORD ? MAX_RECORD : size);
    const query = await repository.getList({ [searchKey]: search, page, size });

    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.GET_DATA_SUCCESSFULLY,
      metadata: {
        current_page: page,
        per_page: size,
        total_item: query.totalRecords,
        total_page: Math.ceil(query.totalRecords / size),
      },
      data: query.data, // Trả về dữ liệu
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};
