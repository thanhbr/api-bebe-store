import { expect } from 'chai';
import { Price } from '../models/index.js';

describe('Price Model', () => {
  describe('Validation', () => {
    it('should validate price with invalid value', () => {
        const price = new Price({
            productId: '1234567890',
            price: 'abc', // Giá trị không hợp lệ
            wholeSalePrice: 10,
            retailPrice: 10,
            promotionPrice: 10,
            importPrice: 10,
            currency: 'VND',
        });
        expect(price.validateSync().errors.price.message).to.equal('Cast to Number failed for value "abc" (type string) at path "price"'); // Kiểm tra lỗi cast
    });
    it('should validate price with positive value', () => {
      const price = new Price({
        productId: '1234567890',
        price: -10,
        wholeSalePrice: 10,
        retailPrice: 10,
        promotionPrice: 10,
        importPrice: 10,
        currency: 'VND',
      });
      expect(price.validateSync().errors.price.message).to.equal('Price must be greater than 0');
    });

    it('should validate wholeSalePrice with positive value', () => {
      const price = new Price({
        productId: '1234567890',
        price: 10,
        wholeSalePrice: -10,
        retailPrice: 10,
        promotionPrice: 10,
        importPrice: 10,
        currency: 'VND',
      });
      expect(price.validateSync().errors.wholeSalePrice.message).to.equal('Whole sale price must be greater than 0');
    });

    it('should validate retailPrice with positive value', () => {
      const price = new Price({
        productId: '1234567890',
        price: 10,
        wholeSalePrice: 10,
        retailPrice: -10,
        promotionPrice: 10,
        importPrice: 10,
        currency: 'VND',
      });
      expect(price.validateSync().errors.retailPrice.message).to.equal('Retail price must be greater than 0');
    });

    it('should validate promotionPrice with positive value', () => {
      const price = new Price({
        productId: '1234567890',
        price: 10,
        wholeSalePrice: 10,
        retailPrice: 10,
        promotionPrice: -10,
        importPrice: 10,
        currency: 'VND',
      });
      expect(price.validateSync().errors.promotionPrice.message).to.equal('Promotion price must be greater than 0');
    });

    it('should validate importPrice with positive value', () => {
      const price = new Price({
        productId: '1234567890',
        price: 10,
        wholeSalePrice: 10,
        retailPrice: 10,
        promotionPrice: 10,
        importPrice: -10,
        currency: 'VND',
      });
      expect(price.validateSync().errors.importPrice.message).to.equal('Import price must be greater than 0');
    });
  });
});