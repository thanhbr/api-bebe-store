import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MESSAGE } from "../global/message.js";
import { DEFAULT_SIZE_RECORD, MAX_RECORD } from "../global/constant.js";
import Exception from "../exceptions/Exception.js";
import { getList } from "./helpers.js";

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  console.log(`They talked about: ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const existingUser = await userRepository.login({ email, password });

    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.USER.LOGIN_SUCCESSFULLY,
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    myEvent.emit("event.register.user", { email, phoneNumber });
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: MESSAGE.USER.REGISTER_SUCCESSFULLY,
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
      validationErrors: exception.validationErrors,
    });
  }
};

const getListUsers = async (req, res) => {
  await getList(req, res, userRepository);
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailUser = await userRepository.getDetail(id);
    if (!detailUser) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: MESSAGE.USER.NOT_FIND_ID,
      });
      return;
    }
    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.USER.GET_DETAIL_SUCCESSFULLY,
      data: detailUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phoneNumber, address, role } = req.body;
    const hasUser = await userRepository.isUserUnique({
      id,
      email,
      phoneNumber,
    });
    if (hasUser) {
      res.status(HttpStatusCode.CONFLICT).json({
        message: MESSAGE.USER.EXIST,
      });
      return;
    }

    const updatedUser = await userRepository.update({
      id,
      name,
      email,
      password,
      phoneNumber,
      address,
      role,
    });
    if (!updatedUser) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: MESSAGE.USER.NOT_FIND_ID,
      });
      return;
    }
    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.USER.UPDATE_SUCCESSFULLY,
      data: updatedUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: authId } = req.user.data;
    if (id === authId) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: `Error: ${MESSAGE.USER.CANNOT_DELETE_SELF}`,
      });
      return;
    }

    await userRepository.deleteUser(id);
    res.status(HttpStatusCode.OK).json({
      message: MESSAGE.USER.DELETED,
    });
  } catch (exception) {
    if (exception.message === Exception.CANNOT_FIND_USER_BY_ID) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: exception.toString(),
      });
    } else if (exception.message === Exception.PERMISSION_DENIED) {
      res.status(HttpStatusCode.FORBIDDEN).json({
        message: exception.toString(),
      });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  }
};

export default {
  login,
  register,
  getList: getListUsers,
  getDetail,
  update,
  deleteUser,
};
