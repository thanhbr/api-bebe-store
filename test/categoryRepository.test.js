import { expect } from 'chai';
import sinon from 'sinon';
import Category from '../models/Category.js';
import { categoryRepository } from '../repositories/index.js'; 
import Exception from '../exceptions/Exception.js';

describe('Category Repository', () => {
    describe('create', () => {
        let CategoryMock;

        beforeEach(() => {
            // Tạo một mock cho model Category trước mỗi test case
            CategoryMock = sinon.mock(Category); 
        });

        afterEach(() => {
            // Khôi phục lại trạng thái ban đầu của mock sau mỗi test case
            CategoryMock.restore(); 
        });

        it('should create a new category successfully', async () => {
            const newCategoryData = {
                parentId: null,
                name: 'Category Test',
                urlKey: 'category-test',
                isActive: true,
                level: 1,
                isChild: false
            };

            // Định nghĩa hành vi mong muốn của mock
            const mockCategory = { 
                ...newCategoryData,
                _id: '64f11e2c68a44b12c8a7f32b' 
            };
            CategoryMock.expects('create').withArgs(newCategoryData).resolves(mockCategory);

            const createdCategory = await categoryRepository.create(newCategoryData);

            // Kiểm tra xem mock có được gọi đúng như mong đợi hay không
            CategoryMock.verify(); 
            expect(createdCategory).to.deep.equal(mockCategory);
        });

        it('should throw an exception when create category failed', async () => {
            const newCategoryData = {
                parentId: null,
                name: 'Category Test',
                urlKey: 'category-test',
                isActive: true,
                level: 1,
                isChild: false
            };

            CategoryMock.expects('create').withArgs(newCategoryData).rejects(new Error('Error creating category'));

            try {
                await categoryRepository.create(newCategoryData);
            } catch (exception) {
                CategoryMock.verify();
                expect(exception.message).to.equal(Exception.CANNOT_CREATE_CATEGORY);
            }
        });
    });
});
