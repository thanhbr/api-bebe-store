import { expect } from "chai";
import sinon from "sinon";
import { Product } from "../models/index.js";
import { MESSAGE } from "../global/message.js";

describe("Product Model", () => {
  describe("Validation", () => {
    it("should validate sku with minimum length", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "AB",
        name: "Product Name",
        urlKey: "product-name",
        description: "Product description",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      expect(product.validateSync().errors.sku.message).to.equal(
        `Product sku ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate name with minimum length", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Pr",
        urlKey: "product-name",
        description: "Product description",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      expect(product.validateSync().errors.name.message).to.equal(
        `Product name ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate urlKey with minimum length", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Product Name",
        urlKey: "pr",
        description: "Product description",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      expect(product.validateSync().errors.urlKey.message).to.equal(
        `Product url key ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate description with minimum length", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Product Name",
        urlKey: "product-name",
        description: "Pr",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      expect(product.validateSync().errors.description.message).to.equal(
        `Product description ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate flavor with minimum length", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Product Name",
        urlKey: "product-name",
        description: "Product description",
        flavor: "Va",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      expect(product.validateSync().errors.flavor.message).to.equal(
        `Product flavor ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate nutritionInfo with minimum length", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Product Name",
        urlKey: "product-name",
        description: "Product description",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nu",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      expect(product.validateSync().errors.nutritionInfo.message).to.equal(
        `Product nutrition info ${MESSAGE.MIN_LENGTH}`,
      );
    });

    it("should validate sku uniqueness", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Product Name",
        urlKey: "product-name",
        description: "Product description",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      const mockValidate = sinon
        .stub(product, "validateSync")
        .returns({
          errors: { sku: { message: "Product sku already exists" } },
        });
      expect(product.validateSync().errors.sku.message).to.equal(
        "Product sku already exists",
      );
    });

    it("should validate urlKey uniqueness", () => {
      const product = new Product({
        brandId: "1234567890",
        categoryId: "1234567890",
        sku: "SKU123",
        name: "Product Name",
        urlKey: "product-name",
        description: "Product description",
        flavor: "Vanilla",
        volume: 100,
        unit: "ml",
        nutritionInfo: "Nutrition information",
        expiryDate: new Date(),
        isActive: true,
        createdBy: "1234567890",
      });
      const mockValidate = sinon
        .stub(product, "validateSync")
        .returns({
          errors: { urlKey: { message: "Product urlKey already exists" } },
        });
      expect(product.validateSync().errors.urlKey.message).to.equal(
        "Product urlKey already exists",
      );
    });
  });
});
