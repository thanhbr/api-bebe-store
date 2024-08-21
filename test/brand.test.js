import { expect } from 'chai';
import sinon from 'sinon';
import { Brand } from '../models/index.js';
import brandRepository from '../repositories/brand.js';
import Exception from '../exceptions/Exception.js';

describe('Brand Repository', () => {
  describe('getList', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return a list of brands with pagination and total records', async () => {
      const search = 'Nike';
      const page = 1;
      const size = 10;
      const filterBrands = [
        { name: 'Nike', code: 'NIKE', urlKey: 'nike', logo: 'https://example.com/nike.png' },
        { name: 'Adidas', code: 'ADIDAS', urlKey: 'adidas', logo: 'https://example.com/adidas.png' },
      ];
      const totalRecords = 20;

      const mockAggregate = sandbox.stub(Brand, 'aggregate').resolves(filterBrands);
      const mockCountDocuments = sandbox.stub(Brand, 'countDocuments').resolves(totalRecords);

      const result = await brandRepository.getList({ search, page, size });

      expect(result).to.deep.equal({
        filterBrands,
        totalRecords,
      });
      expect(mockAggregate.calledOnce).to.be.true;
      expect(mockCountDocuments.calledOnce).to.be.true;
    });

    it('should throw an exception if an error occurs', async () => {
      const search = 'Nike';
      const page = 1;
      const size = 10;
      const error = new Error('Error getting brands');

      const mockAggregate = sandbox.stub(Brand, 'aggregate').rejects(error);

      try {
        await brandRepository.getList({ search, page, size });
        expect.fail('Should have thrown an exception');
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_GET_BRAND);
        expect(mockAggregate.calledOnce).to.be.true;
      }
    });
  });

  describe('getDetail', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return the details of a brand by ID', async () => {
      const brandId = '647890123456789012345678';
      const detailBrand = {
        name: 'Nike',
        code: 'NIKE',
        urlKey: 'nike',
        logo: 'https://example.com/nike.png',
      };

      const mockFindById = sandbox.stub(Brand, 'findById').resolves(detailBrand);

      const result = await brandRepository.getDetail(brandId);

      expect(result).to.deep.equal(detailBrand);
      expect(mockFindById.calledOnceWith(brandId)).to.be.true;
    });

    it('should throw an exception if an error occurs', async () => {
      const brandId = '647890123456789012345678';
      const error = new Error('Error getting brand details');

      const mockFindById = sandbox.stub(Brand, 'findById').rejects(error);

      try {
        await brandRepository.getDetail(brandId);
        expect.fail('Should have thrown an exception');
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_GET_BRAND);
        expect(mockFindById.calledOnceWith(brandId)).to.be.true;
      }
    });
  });

  describe('create', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create a new brand', async () => {
      const code = 'NIKE';
      const name = 'Nike';
      const urlKey = 'nike';
      const logo = 'https://example.com/nike.png';
      const newBrand = {
        code,
        name,
        urlKey,
        logo,
        _id: '647890123456789012345678',
      };

      const mockCreate = sandbox.stub(Brand, 'create').resolves(newBrand);

      const result = await brandRepository.create({ code, name, urlKey, logo });

      expect(result).to.deep.equal({
        code,
        name,
        urlKey,
        logo,
        _id: '647890123456789012345678',
      });
      expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be.true;
    });

    it('should throw an exception if an error occurs', async () => {
      const code = 'NIKE';
      const name = 'Nike';
      const urlKey = 'nike';
      const logo = 'https://example.com/nike.png';
      const error = new Error('Error creating brand');

      const mockCreate = sandbox.stub(Brand, 'create').rejects(error);

      try {
        await brandRepository.create({ code, name, urlKey, logo });
        expect.fail(Exception.CANNOT_CREATE_BRAND);
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_CREATE_BRAND);
        expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be.true;
      }
    });
  });

  describe('isBrandUnique', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return true if the brand code or urlKey is already in use', async () => {
      const code = 'NIKE';
      const urlKey = 'nike';
      const existingBrand = { code, urlKey };

      const mockFindOne = sandbox.stub(Brand, 'findOne').resolves(existingBrand);

      const result = await brandRepository.isBrandUnique({ code, urlKey });

      expect(result).to.be.true;
      expect(mockFindOne.calledOnceWith({ $or: [{ code }, { urlKey }] })).to.be.true;
    });

    it('should return false if the brand code or urlKey is not in use', async () => {
      const code = 'NIKE';
      const urlKey = 'nike';

      const mockFindOne = sandbox.stub(Brand, 'findOne').resolves(null);

      const result = await brandRepository.isBrandUnique({ code, urlKey });

      expect(result).to.be.false;
      expect(mockFindOne.calledOnceWith({ $or: [{ code }, { urlKey }] })).to.be.true;
    });

    it('should throw an exception if an error occurs', async () => {
      const code = 'NIKE';
      const urlKey = 'nike';
      const error = new Error('Error checking brand uniqueness');

      const mockFindOne = sandbox.stub(Brand, 'findOne').rejects(error);

      try {
        await brandRepository.isBrandUnique({ code, urlKey });
        expect.fail('Should have thrown an exception');
      } catch (exception) {
        expect(exception.message).to.equal(Exception.CANNOT_CHECK_UNIQUE);
        expect(mockFindOne.calledOnceWith({ $or: [{ code }, { urlKey }] })).to.be.true;
      }
    });
  });
});
