import { expect } from "chai";
import sinon from "sinon";
import { Brand } from "../models/index.js";
import brandRepository from "../repositories/brand.js";
import Exception from "../exceptions/Exception.js";

describe("Brand Repository", () => {
  describe("getList", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should return a list of brands with pagination and total records", async () => {
      const search = "Nike";
      const page = 1;
      const size = 10;
      const data = [
        {
          name: "Nike",
          code: "NIKE",
          urlKey: "nike",
          logo: "https://example.com/nike.png",
        },
        {
          name: "Adidas",
          code: "ADIDAS",
          urlKey: "adidas",
          logo: "https://example.com/adidas.png",
        },
      ];
      const totalRecords = 20;

      const mockAggregate = sandbox.stub(Brand, "aggregate").resolves(data);
      const mockCountDocuments = sandbox
        .stub(Brand, "countDocuments")
        .resolves(totalRecords);

      const result = await brandRepository.getList({ search, page, size });

      expect(result).to.deep.equal({
        data,
        totalRecords,
      });
      expect(mockAggregate.calledOnce).to.be.true;
      expect(mockCountDocuments.calledOnce).to.be.true;
    });

    it("should throw an exception if an error occurs", async () => {
      const search = "Nike";
      const page = 1;
      const size = 10;
      const error = new Error("Error getting brands");

      const mockAggregate = sandbox.stub(Brand, "aggregate").rejects(error);

      try {
        await brandRepository.getList({ search, page, size });
        expect.fail("Should have thrown an exception");
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_GET_BRAND);
        expect(mockAggregate.calledOnce).to.be.true;
      }
    });
  });

  describe("getDetail", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should return the details of a brand by ID", async () => {
      const brandId = "66c3fe1b4c2a79ad8ecf8f31";
      const detailBrand = {
        _id: "66c3fe1b4c2a79ad8ecf8f31",
        name: "Nike",
        code: "NIKE",
        urlKey: "nike",
        logo: "https://example.com/nike.png",
      };

      const mockFindById = sandbox
        .stub(Brand, "findById")
        .resolves(detailBrand);

      const result = await brandRepository.getDetail(brandId);

      expect(result).to.deep.equal(detailBrand);
      expect(mockFindById.calledOnceWith(brandId)).to.be.true;
    });

    it("should throw an exception if an error occurs", async () => {
      const brandId = "647890123456789012345678";
      const error = new Error("Error getting brand details");

      const mockFindById = sandbox.stub(Brand, "findById").rejects(error);

      try {
        await brandRepository.getDetail(brandId);
        expect.fail("Should have thrown an exception");
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_GET_BRAND);
        expect(mockFindById.calledOnceWith(brandId)).to.be.true;
      }
    });
  });

  describe("create", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should create a new brand", async () => {
      const code = "NIKE";
      const name = "Nike";
      const urlKey = "nike";
      const logo = "https://example.com/nike.png";
      const newBrand = {
        code,
        name,
        urlKey,
        logo,
        _id: "647890123456789012345678",
      };

      const mockCreate = sandbox.stub(Brand, "create").resolves(newBrand);

      const result = await brandRepository.create({ code, name, urlKey, logo });

      expect(result).to.deep.equal({
        code,
        name,
        urlKey,
        logo,
        _id: "647890123456789012345678",
      });
      expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be
        .true;
    });

    it("should throw an exception if an error occurs", async () => {
      const code = "NIKE";
      const name = "Nike";
      const urlKey = "nike";
      const logo = "https://example.com/nike.png";
      const error = new Error("Error creating brand");

      const mockCreate = sandbox.stub(Brand, "create").rejects(error);

      try {
        await brandRepository.create({ code, name, urlKey, logo });
        expect.fail(Exception.CANNOT_CREATE_BRAND);
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_CREATE_BRAND);
        expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be
          .true;
      }
    });
  });

  describe("update", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should update an existing brand", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const name = "Nike";
      const urlKey = "nike";
      const logo = "https://example.com/nike.png";
      const updatedBrand = {
        code,
        name,
        urlKey,
        logo,
        _id: id,
      };

      const mockFindByIdAndUpdate = sandbox
        .stub(Brand, "findByIdAndUpdate")
        .resolves(updatedBrand);
      const mockFindById = sandbox
        .stub(Brand, "findById")
        .resolves(updatedBrand); // Stub for checking existing brand

      const result = await brandRepository.update({
        id,
        code,
        name,
        urlKey,
        logo,
      });

      expect(result).to.deep.equal(updatedBrand);
      expect(
        mockFindByIdAndUpdate.calledOnceWith(
          id,
          { code, name, urlKey, logo },
          { new: true },
        ),
      ).to.be.true;
      expect(mockFindById.calledOnceWith(id)).to.be.true; // Verify findById is called
    });

    it("should create a new brand if the ID doesn't exist", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const name = "Nike";
      const urlKey = "nike";
      const logo = "https://example.com/nike.png";
      const newBrand = {
        code,
        name,
        urlKey,
        logo,
        _id: id,
      };

      const mockCreate = sandbox.stub(Brand, "create").resolves(newBrand);
      const mockFindById = sandbox.stub(Brand, "findById").resolves(null); // Stub for checking non-existing brand

      const result = await brandRepository.update({
        id,
        code,
        name,
        urlKey,
        logo,
      });

      expect(result).to.deep.equal(newBrand);
      expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be
        .true;
      expect(mockFindById.calledOnceWith(id)).to.be.true; // Verify findById is called
    });

    it("should throw an exception if an error occurs during update", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const name = "Nike";
      const urlKey = "nike";
      const logo = "https://example.com/nike.png";
      const error = new Error("Error updating brand");

      const mockFindByIdAndUpdate = sandbox
        .stub(Brand, "findByIdAndUpdate")
        .rejects(error);
      const mockFindById = sandbox.stub(Brand, "findById").resolves({
        code,
        name,
        urlKey,
        logo,
        _id: id,
      });

      try {
        await brandRepository.update({ id, code, name, urlKey, logo });
        expect.fail("Should have thrown an exception");
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_UPDATE_BRAND);
        expect(
          mockFindByIdAndUpdate.calledOnceWith(
            id,
            { code, name, urlKey, logo },
            { new: true },
          ),
        ).to.be.true;
        expect(mockFindById.calledOnceWith(id)).to.be.true; // Verify findById is called
      }
    });

    it("should throw an exception if an error occurs during creation", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const name = "Nike";
      const urlKey = "nike";
      const logo = "https://example.com/nike.png";
      const error = new Error("Error creating brand");

      const mockCreate = sandbox.stub(Brand, "create").rejects(error);
      const mockFindById = sandbox.stub(Brand, "findById").resolves(null); // Stub for checking non-existing brand

      try {
        await brandRepository.update({ id, code, name, urlKey, logo });
        expect.fail("Should have thrown an exception");
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_UPDATE_BRAND);
        expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be
          .true;
        expect(mockFindById.calledOnceWith(id)).to.be.true; // Verify findById is called
      }
    });
  });

  describe("isBrandUnique", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should return true if the brand code or urlKey is already in use (without id)", async () => {
      const code = "NIKE";
      const urlKey = "nike";
      const existingBrand = { code, urlKey };

      const mockFindOne = sandbox
        .stub(Brand, "findOne")
        .resolves(existingBrand);

      const result = await brandRepository.isBrandUnique({ code, urlKey });

      expect(result).to.be.true;
      expect(mockFindOne.calledOnceWith({ $or: [{ code }, { urlKey }] })).to.be
        .true;
    });

    it("should return false if the brand code or urlKey is not in use (without id)", async () => {
      const code = "NIKE";
      const urlKey = "nike";

      const mockFindOne = sandbox.stub(Brand, "findOne").resolves(null);

      const result = await brandRepository.isBrandUnique({ code, urlKey });

      expect(result).to.be.false;
      expect(mockFindOne.calledOnceWith({ $or: [{ code }, { urlKey }] })).to.be
        .true;
    });

    it("should return true if the brand code or urlKey is already in use (with id)", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const urlKey = "nike";
      const existingBrand = { code, urlKey };

      const mockFindOne = sandbox
        .stub(Brand, "findOne")
        .resolves(existingBrand);

      const result = await brandRepository.isBrandUnique({ code, urlKey, id });

      expect(result).to.be.true;
      expect(
        mockFindOne.calledOnceWith({
          $or: [{ code }, { urlKey }],
          _id: { $ne: id },
        }),
      ).to.be.true;
    });

    it("should return false if the brand code or urlKey is not in use (with id)", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const urlKey = "nike";

      const mockFindOne = sandbox.stub(Brand, "findOne").resolves(null);

      const result = await brandRepository.isBrandUnique({ code, urlKey, id });

      expect(result).to.be.false;
      expect(
        mockFindOne.calledOnceWith({
          $or: [{ code }, { urlKey }],
          _id: { $ne: id },
        }),
      ).to.be.true;
    });

    it("should throw an exception if an error occurs", async () => {
      const id = "647890123456789012345678";
      const code = "NIKE";
      const urlKey = "nike";
      const error = new Error("Error checking brand uniqueness");

      const mockFindOne = sandbox.stub(Brand, "findOne").rejects(error);

      try {
        await brandRepository.isBrandUnique({ code, urlKey, id });
        expect.fail("Should have thrown an exception");
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_CHECK_BRAND_UNIQUE);
        expect(
          mockFindOne.calledOnceWith({
            $or: [{ code }, { urlKey }],
            _id: { $ne: id },
          }),
        ).to.be.true;
      }
    });
  });
});
