import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto"
import { UpdateProductUseCase } from "./update.product.usecase"

describe('Update product use case unit test', () => {
    const product = ProductFactory.create('a', 'Product 1', 10)
  
    const MockRepository = () => {
      return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
      }
    }
    it('should be able to update a product', async () => {
      const productRepository = MockRepository()
  
      const input: InputUpdateProductDto = {
        id: product.id,
        name: 'Product 1 - UPDATED',
        price: 10
      }
  
      const useCase = new UpdateProductUseCase(productRepository)
  
      const updateProduct = await useCase.execute(input)
  
      const output: OutputUpdateProductDto = {
        id: product.id,
        name: product.name,
        price: product.price
      }
  
      expect(updateProduct).toEqual(output)
    })
  })