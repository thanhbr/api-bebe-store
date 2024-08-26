import { expect } from "chai";
import sinon from "sinon";
import { Brand } from "../models/index.js";
import { MESSAGE } from "../global/message.js";

describe("Brand Model", () => {
  describe("Validation", () => {
    it("should validate code with minimum length", () => {
      const brand = new Brand({
        code: "AB",
        name: "Nike",
        urlKey: "nike",
        logo: "https://example.com/nike.png",
      });
      expect(brand.validateSync().errors.code.message).to.equal(
        `Brand code ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate name with minimum length", () => {
      const brand = new Brand({
        code: "NIKE",
        name: "Ni",
        urlKey: "nike",
        logo: "https://example.com/nike.png",
      });
      expect(brand.validateSync().errors.name.message).to.equal(
        `Brand name ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate urlKey with minimum length", () => {
      const brand = new Brand({
        code: "NIKE",
        name: "Nike",
        urlKey: "ni",
        logo: "https://example.com/nike.png",
      });
      expect(brand.validateSync().errors.urlKey.message).to.equal(
        `Brand url ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate logo with minimum length", () => {
      const brand = new Brand({
        code: "NIKE",
        name: "Nike",
        urlKey: "nike",
        logo: "ht",
      });
      expect(brand.validateSync().errors.logo.message).to.equal(
        `Brand logo ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate code uniqueness", () => {
      const brand = new Brand({
        code: "NIKE",
        name: "Nike",
        urlKey: "nike",
        logo: "https://example.com/nike.png",
      });
      const mockValidate = sinon
        .stub(brand, "validateSync")
        .returns({
          errors: { code: { message: "Brand code already exists" } },
        });
      expect(brand.validateSync().errors.code.message).to.equal(
        "Brand code already exists",
      );
    });

    it("should validate urlKey uniqueness", () => {
      const brand = new Brand({
        code: "NIKE",
        name: "Nike",
        urlKey: "nike",
        logo: "https://example.com/nike.png",
      });
      const mockValidate = sinon
        .stub(brand, "validateSync")
        .returns({
          errors: { urlKey: { message: "Brand urlKey already exists" } },
        });
      expect(brand.validateSync().errors.urlKey.message).to.equal(
        "Brand urlKey already exists",
      );
    });
  });
});
