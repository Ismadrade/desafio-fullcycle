import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto"
import { CreateProductUseCase } from "./create.product.usecase"

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  }
  
  describe('Create product use case unit test', () => {
    it('should be able to create product', async () => {
      const input: InputCreateProductDto = {
        type: 'a',
        name: 'Product 1',
        price: 10
      }
  
      const productRepository = MockRepository()
  
      const useCase = new CreateProductUseCase(productRepository)
  
      const createProduct = await useCase.execute(input)
  
      const output: OutputCreateProductDto = {
        id: expect.any(String),
        name: input.name,
        price: input.price
      }
  
      expect(createProduct).toEqual(output)
    })
  
    it('should throw an error when price is less than 0', async () => {
      const input: InputCreateProductDto = {
        type: 'a',
        name: 'Product 1',
        price: -10
      }
  
      const productRepository = MockRepository()
  
      const useCase = new CreateProductUseCase(productRepository)
  
      await expect(useCase.execute(input)).rejects.toThrow(
        'Price must be greater than zero'
      )
    })
  
    it('should throw an error when name is missing', async () => {
      const input: InputCreateProductDto = {
        type: 'a',
        name: '',
        price: 10
      }
  
      const productRepository = MockRepository()
  
      const useCase = new CreateProductUseCase(productRepository)
  
      await expect(useCase.execute(input)).rejects.toThrow('Name is required')
    })
  })