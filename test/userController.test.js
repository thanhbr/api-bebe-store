// import { expect } from 'chai';
// import sinon from 'sinon';
// import userController from '../controllers/user.js';
// import HttpStatusCode from '../exceptions/HttpStatusCode.js';
// import userRepository from '../repositories/user.js';

// describe('UserController', () => {
//   let sandbox;
//   let req;
//   let res;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//     req = {
//       body: {
//         email: 'test@example.com',
//         password: 'password123',
//       },
//     };
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it('should register a new user', async () => {
//     const mockIsUserUnique = sandbox.stub(userRepository, 'isUserUnique').resolves(false);
//     const mockCreateUser = sandbox.stub(userRepository, 'register').resolves({
//       _id: '1234567890',
//       email: 'test@example.com',
//       name: 'Test User',
//       password: 'password123',
//       phoneNumber: "0321032321",
//       address: "test address"
//     });
//     await userController.register(req, res);
//     expect(mockIsUserUnique.calledOnceWith({ email: 'test@example.com' })).to.be.true;
//     expect(mockCreateUser.calledOnceWith({ _id: '1234567890', name: 'Test User', email: 'test@example.com', password: '', phoneNumber: "0321032321", address: "test address" })).to.be.true;
//     expect(res.status.calledOnceWith(HttpStatusCode.INSERT_OK)).to.be.true;
//     expect(res.json.calledOnceWith({ message: 'User created successfully', data: { _id: '1234567890', name: 'Test User', email: 'test@example.com', password: "", phoneNumber: "0321032321", address: "test address" } })).to.be.true;
//   });

//   it('should return conflict if user already exists', async () => {
//     const mockIsUserUnique = sandbox.stub(userRepository, 'isUserUnique').resolves(true);
//     await userController.register(req, res);
//     expect(mockIsUserUnique.calledOnceWith({ email: 'test@example.com' })).to.be.true;
//     expect(res.status.calledOnceWith(HttpStatusCode.CONFLICT)).to.be.true;
//     expect(res.json.calledOnceWith({ message: 'User already exists' })).to.be.true;
//   });
// });
