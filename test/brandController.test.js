import { expect } from 'chai';
import sinon from 'sinon';
import brandController from '../controllers/brand.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import brandRepository from '../repositories/brand.js';
import { MESSAGE } from '../global/message.js';

describe('Brand Controller', () => {
  let sandbox;
  let req;
  let res;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {
      query: {},
      body: {},
      params: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getList', () => {
    it('should return a list of brands with pagination and total records', async () => {
      const search = 'Nike';
      const page = 1;
      const size = 10;
      const filterBrands = [
        { name: 'Nike', code: 'NIKE', urlKey: 'nike', logo: 'https://example.com/nike.png' },
        { name: 'Adidas', code: 'ADIDAS', urlKey: 'adidas', logo: 'https://example.com/adidas.png' },
      ];
      const totalRecords = 20;

      req.query = { search, page, size };
      const mockGetList = sandbox.stub(brandRepository, 'getList').resolves({ filterBrands, totalRecords });

      await brandController.getList(req, res);

      expect(mockGetList.calledOnceWith({ search, page, size })).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
      expect(res.json.calledOnceWith({
        message: MESSAGE.BRAND.GET_LIST_SUCCESSFULLY,
        metadata: {
          current_page: page,
          per_page: size,
          total_item: totalRecords,
          total_page: Math.ceil(totalRecords / size),
        },
        data: filterBrands,
      })).to.be.true;
    });

    it('should handle error when getting list of brands', async () => {
      const error = new Error('Error getting brands');
      req.query = { search: 'Nike', page: 1, size: 10 };
      const mockGetList = sandbox.stub(brandRepository, 'getList').rejects(error);

      await brandController.getList(req, res);

      expect(mockGetList.calledOnceWith({ search: 'Nike', page: 1, size: 10 })).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.INTERNAL_SERVER_ERROR)).to.be.true;
      expect(res.json.calledOnceWith({ message: error.toString() })).to.be.true;
    });
  });

  describe('getDetail', () => {
    it('should return the details of a brand by ID', async () => {
      const brandId = '66c3fe1b4c2a79ad8ecf8f33'; // Example brand ID
      const detailBrand = {
        _id: '66c3fe1b4c2a79ad8ecf8f33',
        code: '2155',
        name: 'shoes Nike',
        urlKey: 'shoes-nike',
        logo: 'https://example.com/nike.png',
      };

      req.params = { id: brandId }; // Set the brandId in req.params.id
      const mockGetDetail = sandbox.stub(brandRepository, 'getDetail').resolves(detailBrand);
 

      await brandController.getDetail(req, res);

      expect(mockGetDetail.calledOnceWith(brandId)).to.be.true; // Verify getDetail is called with the correct ID
      expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
      expect(res.json.calledOnceWith({
        message: MESSAGE.BRAND.GET_DETAIL_SUCCESSFULLY,
        data: detailBrand,
      })).to.be.true;
    });

    it('should handle error when getting brand details', async () => {
      const brandId = '66c3fe1b4c2a79ad8ecf8f33'; // Example brand ID
      const error = new Error('Error getting brand details');

      req.params = { id: brandId }; // Set the brandId in req.params.id
      const mockGetDetail = sandbox.stub(brandRepository, 'getDetail').rejects(error);

      await brandController.getDetail(req, res);

      expect(mockGetDetail.calledOnceWith(brandId)).to.be.true; // Verify getDetail is called with the correct ID
      expect(res.status.calledOnceWith(HttpStatusCode.INTERNAL_SERVER_ERROR)).to.be.true;
      expect(res.json.calledOnceWith({ message: error.toString() })).to.be.true;
    });
  });

  describe('create', () => {
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

      req.body = { code, name, urlKey, logo };
      const mockIsBrandUnique = sandbox.stub(brandRepository, 'isBrandUnique').resolves(false);
      const mockCreate = sandbox.stub(brandRepository, 'create').resolves(newBrand);

      await brandController.create(req, res);

      expect(mockIsBrandUnique.calledOnceWith({ code, urlKey })).to.be.true;
      expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.INSERT_OK)).to.be.true;
      expect(res.json.calledOnceWith({
        message: MESSAGE.BRAND.CREATED,
        data: newBrand,
      })).to.be.true;
    });

    it('should return conflict if brand already exists', async () => {
      const code = 'NIKE';
      const name = 'Nike';
      const urlKey = 'nike';
      const logo = 'https://example.com/nike.png';

      req.body = { code, name, urlKey, logo };
      const mockIsBrandUnique = sandbox.stub(brandRepository, 'isBrandUnique').resolves(true);

      await brandController.create(req, res);

      expect(mockIsBrandUnique.calledOnceWith({ code, urlKey })).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.CONFLICT)).to.be.true;
      expect(res.json.calledOnceWith({ message: MESSAGE.BRAND.EXIST })).to.be.true;
    });

    it('should handle error when creating a new brand', async () => {
      const code = 'NIKE';
      const name = 'Nike';
      const urlKey = 'nike';
      const logo = 'https://example.com/nike.png';
      const error = new Error('Error creating brand');

      req.body = { code, name, urlKey, logo };
      const mockIsBrandUnique = sandbox.stub(brandRepository, 'isBrandUnique').resolves(false);
      const mockCreate = sandbox.stub(brandRepository, 'create').rejects(error);

      await brandController.create(req, res);

      expect(mockIsBrandUnique.calledOnceWith({ code, urlKey })).to.be.true;
      expect(mockCreate.calledOnceWith({ code, name, urlKey, logo })).to.be.true;
      expect(res.status.calledOnceWith(HttpStatusCode.INTERNAL_SERVER_ERROR)).to.be.true;
      expect(res.json.calledOnceWith({ message: error.toString(), validateErrors: error.validationErrors })).to.be.true;
    });
  });

//   describe('update', () => {
//     it('should update a brand', async () => {
//       const brandId = '647890123456789012345678';
//       const code = 'NIKE';
//       const name = 'Nike';
//       const urlKey = 'nike';
//       const logo = 'https://example.com/nike.png';
//       const updatedBrand = {
//         code,
//         name,
//         urlKey,
//         logo,
//         _id: '647890123456789012345678',
//       };

//       req.params = { brandId };
//       req.body = { code, name, urlKey, logo };
//       const mockUpdate = sandbox.stub(brandRepository, 'update').resolves(updatedBrand);

//       await brandController.update(req, res);

//       expect(mockUpdate.calledOnceWith({ id: brandId, code, name, urlKey, logo })).to.be.true;
//       expect(res.status.calledOnceWith(HttpStatusCode.OK)).to.be.true;
//       expect(res.json.calledOnceWith({
//         message: MESSAGE.BRAND.UPDATED,
//         data: updatedBrand,
//       })).to.be.true;
//     });

//     it('should handle error when updating a brand', async () => {
//       const brandId = '647890123456789012345678';
//       const code = 'NIKE';
//       const name = 'Nike';
//       const urlKey = 'nike';
//       const logo = 'https://example.com/nike.png';
//       const error = new Error('Error updating brand');

//       req.params = { brandId };
//       req.body = { code, name, urlKey, logo };
//       const mockUpdate = sandbox.stub(brandRepository, 'update').rejects(error);

//       await brandController.update(req, res);

//       expect(mockUpdate.calledOnceWith({ id: brandId, code, name, urlKey, logo })).to.be.true;
//       expect(res.status.calledOnceWith(HttpStatusCode.INTERNAL_SERVER_ERROR)).to.be.true;
//       expect(res.json.calledOnceWith({ message: error.toString() })).to.be.true;
//     });
//   });
});

