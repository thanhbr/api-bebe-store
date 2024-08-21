import { expect } from 'chai';
import sinon from 'sinon';
import auth from '../authentication/auth.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import jwt from 'jsonwebtoken';
import { PATH } from '../global/path.js';
import { MESSAGE } from '../global/message.js';

describe('Authentication Middleware', () => {
  let sandbox;
  let req;
  let res;
  let next;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {
      headers: {
        authorization: 'Bearer token123',
      },
      originalUrl: '/users',
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should bypass login and register routes', () => {
    req.originalUrl = PATH.LOGIN;
    auth(req, res, next);
    expect(next.calledOnce).to.be.true;
  });

  it('should bypass register routes', () => {
    req.originalUrl = PATH.REGISTER;
    auth(req, res, next);
    expect(next.calledOnce).to.be.true;
  });

  it('should call next if token is valid', async () => {
    const mockVerify = sandbox.stub(jwt, 'verify').resolves();
    auth(req, res, next);
    expect(mockVerify.calledOnceWith('token123', process.env.JWT_SECRET)).to.be.true;
    expect(next.calledOnce).to.be.true;
  });

  it('should send 400 status and error message if token is invalid', async () => {
    const mockVerify = sandbox.stub(jwt, 'verify').rejects(new Error(MESSAGE.TOKEN.INVALID));
    auth(req, res, next);
    expect(mockVerify.calledOnceWith('token123', process.env.JWT_SECRET)).to.be.true;
    expect(res.status.calledOnceWith(HttpStatusCode.UNAUTHORIZED)).to.be.false;
    expect(res.json.calledOnceWith({ message: MESSAGE.TOKEN.INVALID })).to.be.false;
    expect(next.notCalled).to.be.false;
  });
});
