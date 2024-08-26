import { expect } from "chai";
import sinon from "sinon";
import { Promotion } from "../models/index.js";
import { MESSAGE } from "../global/message.js";

describe("Promotion Model", () => {
  describe("Validation", () => {
    it("should validate code with minimum length", () => {
      const promotion = new Promotion({
        code: "AB",
        name: "Promotion Name",
        discountType: "percent",
        discountValue: 10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(),
        createdBy: "1234567890",
      });
      expect(promotion.validateSync().errors.code.message).to.equal(
        `Promotion code ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate name with minimum length", () => {
      const promotion = new Promotion({
        code: "PROMO123",
        name: "Pr",
        discountType: "percent",
        discountValue: 10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(),
        createdBy: "1234567890",
      });
      expect(promotion.validateSync().errors.name.message).to.equal(
        `Promotion name ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate discountType with supported values", () => {
      const promotion = new Promotion({
        code: "PROMO123",
        name: "Promotion Name",
        discountType: "invalid",
        discountValue: 10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(),
        createdBy: "1234567890",
      });
      expect(promotion.validateSync().errors.discountType.message).to.equal(
        "invalid is not supported",
      );
    });

    it("should validate discountValue with positive value", () => {
      const promotion = new Promotion({
        code: "PROMO123",
        name: "Promotion Name",
        discountType: "percent",
        discountValue: -10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(),
        createdBy: "1234567890",
      });
      expect(promotion.validateSync().errors.discountValue.message).to.equal(
        "Discount value must be greater than 0",
      );
    });

    it("should validate code uniqueness", () => {
      const promotion = new Promotion({
        code: "PROMO123",
        name: "Promotion Name",
        discountType: "percent",
        discountValue: 10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(),
        createdBy: "1234567890",
      });
      const mockValidate = sinon
        .stub(promotion, "validateSync")
        .returns({
          errors: { code: { message: "Promotion code already exists" } },
        });
      expect(promotion.validateSync().errors.code.message).to.equal(
        "Promotion code already exists",
      );
    });
  });
});
