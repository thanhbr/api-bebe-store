import { expect } from "chai";
import sinon from "sinon";
import connect from "../database/database.js";
import mongoose from "mongoose";
import Exception from "../exceptions/Exception.js";

describe("Database Connection", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should connect to the database successfully", async () => {
    const mockConnect = sandbox.stub(mongoose, "connect").resolves();
    await connect();
    expect(mockConnect.calledOnce).to.be.true;
  });

  it("should throw an error if connection fails", async () => {
    const mockConnect = sandbox
      .stub(mongoose, "connect")
      .rejects(new Error("Connection failed"));
    try {
      await connect();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.equal(Exception.WRONG_CONNECT_TO_MONGOOSE);
    }
  });
});
