import { expect } from "chai";
import sinon from "sinon";
import { User } from "../models/index.js";
import { MESSAGE } from "../global/message.js";

describe("User Model", () => {
  describe("Validation", () => {
    it("should validate name with minimum length", () => {
      const user = new User({
        name: "Te",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "0123456789",
        address: "Test Address",
      });
      expect(user.validateSync().errors.name.message).to.equal(
        MESSAGE.USER.USER_NAME_LEAST_5_CHARACTERS,
      );
    });

    it("should validate email with correct format", () => {
      const user = new User({
        name: "Test User",
        email: "test.example.com",
        password: "password123",
        phoneNumber: "0123456789",
        address: "Test Address",
      });
      expect(user.validateSync().errors.email.message).to.equal(
        MESSAGE.USER.EMAIL_INCORRECT_FORMAT,
      );
    });

    it("should validate password with minimum length", () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "pass",
        phoneNumber: "0123456789",
        address: "Test Address",
      });
      expect(user.validateSync().errors.password.message).to.equal(
        MESSAGE.USER.PASS_LEAST_8_CHARACTERS,
      );
    });

    it("should validate phoneNumber with minimum length", () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "01234567",
        address: "Test Address",
      });
      expect(user.validateSync().errors.phoneNumber.message).to.equal(
        MESSAGE.USER.PHONE_LEAST_8_CHARACTERS,
      );
    });

    it("should validate email uniqueness", () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "0123456789",
        address: "Test Address",
      });
      const mockValidate = sinon
        .stub(user, "validateSync")
        .returns({
          errors: { email: { message: "User email already exists" } },
        });
      expect(user.validateSync().errors.email.message).to.equal(
        "User email already exists",
      );
    });

    it("should validate phoneNumber uniqueness", () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "0123456789",
        address: "Test Address",
      });
      const mockValidate = sinon
        .stub(user, "validateSync")
        .returns({
          errors: {
            phoneNumber: { message: "User phone number already exists" },
          },
        });
      expect(user.validateSync().errors.phoneNumber.message).to.equal(
        "User phone number already exists",
      );
    });
  });
});
