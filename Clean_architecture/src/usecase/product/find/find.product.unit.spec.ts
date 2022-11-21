import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import { FindProductUseCase } from "./find.product.usecase"

const product = ProductFactory.create('a', 'Product 1', 10)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Find product use case unit test', () => {
  it('should be able to find product by id', async () => {
    const productRepository = MockRepository()

    const useCase = new FindProductUseCase(productRepository)

    await productRepository.create(product)

    const input: InputFindProductDto = {
      id: product.id
    }

    const findProduct = await useCase.execute(input)

    const output: OutputFindProductDto = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    expect(findProduct).toEqual(output)
  })

  it('should not find a product by id', async () => {
    const productRepository = MockRepository()

    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found.')
    })

    const useCase = new FindProductUseCase(productRepository)

    const input: InputFindProductDto = {
      id: product.id
    }

    expect(() => useCase.execute(input)).rejects.toThrow('Product not found.')
  })
})