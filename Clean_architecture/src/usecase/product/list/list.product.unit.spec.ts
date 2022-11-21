import ProductFactory from "../../../domain/product/factory/product.factory"
import { OutputListProductsDto } from "./list.product.dto"
import { ListProductsUseCase } from "./list.product.usecase"

describe('List products use case unit test', () => {
    const product1 = ProductFactory.create('a', 'Product 1', 5)
  
    const product2 = ProductFactory.create('b', 'Product 2', 10)
  
    const MockRepository = () => {
      return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn()
      }
    }
  
    it('should be able to list products', async () => {
      const productRepository = MockRepository()
  
      const useCase = new ListProductsUseCase(productRepository)
  
      const findAllProducts = await useCase.execute({})
  
      const output: OutputListProductsDto = {
        products: [
          {
            id: product1.id,
            name: product1.name,
            price: product1.price
          },
          {
            id: product2.id,
            name: product2.name,
            price: product2.price
          }
        ]
      }
  
      expect(findAllProducts.products.length).toBe(2)
      expect(findAllProducts).toEqual(output)
    })
  })