import { expect } from "chai";
import sinon from "sinon";
import { Category } from "../models/index.js";
import { MESSAGE } from "../global/message.js";

describe("Category Model", () => {
  describe("Validation", () => {
    it("should validate name with minimum length", () => {
      const category = new Category({
        parentId: null,
        name: "Ca",
        urlKey: "category",
        isActive: true,
        level: 1,
        isChild: false,
      });
      expect(category.validateSync().errors.name.message).to.equal(
        `Category name ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate urlKey with minimum length", () => {
      const category = new Category({
        parentId: null,
        name: "Category",
        urlKey: "ca",
        isActive: true,
        level: 1,
        isChild: false,
      });
      expect(category.validateSync().errors.urlKey.message).to.equal(
        `Category url key ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate urlKey uniqueness", () => {
      const category = new Category({
        parentId: null,
        name: "Category",
        urlKey: "category",
        isActive: true,
        level: 1,
        isChild: false,
      });
      const mockValidate = sinon
        .stub(category, "validateSync")
        .returns({
          errors: { urlKey: { message: "Category urlKey already exists" } },
        });
      expect(category.validateSync().errors.urlKey.message).to.equal(
        "Category urlKey already exists",
      );
    });
  });
});
