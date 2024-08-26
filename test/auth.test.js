import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import checkToken from "../authentication/auth.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MESSAGE } from "../global/message.js";
import { PATH } from "../global/path.js";

describe("Authentication Middleware", () => {
  let sandbox;
  let req;
  let res;
  let next;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {
      headers: {
        authorization: "Bearer token123",
      },
      originalUrl: "/test-route", // Đường dẫn mặc định cho các test case
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should bypass login and register routes", () => {
    req.originalUrl = PATH.LOGIN; // Đặt đường dẫn là /api/v1/auth/login
    checkToken(req, res, next);
    expect(next.calledOnce).to.be.true;

    req.originalUrl = PATH.REGISTER; // Đặt đường dẫn là /api/v1/auth/register
    checkToken(req, res, next);
    expect(next.calledTwice).to.be.true; // next được gọi 2 lần (cho cả login và register)
  });

  it("should call next if token is valid", async () => {
    const mockVerify = sandbox.stub(jwt, "verify").resolves({ userId: "123" }); // Giả lập token hợp lệ
    await checkToken(req, res, next);
    expect(mockVerify.calledOnceWith("token123", process.env.JWT_SECRET)).to.be
      .true;
    expect(next.calledOnce).to.be.true;
  });

  it("should return unauthorized if token is invalid", async () => {
    const mockVerify = sandbox
      .stub(jwt, "verify")
      .throws(new Error("Invalid token")); // Giả lập token không hợp lệ
    await checkToken(req, res, next);
    expect(mockVerify.calledOnceWith("token123", process.env.JWT_SECRET)).to.be
      .true;
    expect(res.status.calledOnceWith(HttpStatusCode.UNAUTHORIZED)).to.be.true;
    expect(res.json.calledOnceWith({ message: MESSAGE.TOKEN.INVALID })).to.be
      .true;
  });

  it("should return unauthorized if token is expired", async () => {
    const mockVerify = sandbox
      .stub(jwt, "verify")
      .throws({ name: "TokenExpiredError" }); // Giả lập token hết hạn
    await checkToken(req, res, next);
    expect(res.status.calledOnceWith(HttpStatusCode.UNAUTHORIZED)).to.be.true;
    expect(res.json.calledOnceWith({ message: MESSAGE.TOKEN.EXPIRED })).to.be
      .true;
  });

  it("should return unauthorized if token is missing", async () => {
    req.headers.authorization = ""; // Loại bỏ token khỏi header
    await checkToken(req, res, next);
    expect(res.status.calledOnceWith(HttpStatusCode.UNAUTHORIZED)).to.be.true;
    expect(res.json.calledOnceWith({ message: MESSAGE.TOKEN.INVALID })).to.be
      .true;
  });
});
