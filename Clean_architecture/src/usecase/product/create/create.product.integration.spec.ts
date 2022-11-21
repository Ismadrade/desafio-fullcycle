import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto"
import { CreateProductUseCase } from "./create.product.usecase"

describe('Create product use case integration test', () => {
    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([ProductModel])
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    })
  
    it('should be able to create a customer', async () => {
      const productRepository = new ProductRepository()
  
      const useCase = new CreateProductUseCase(productRepository)
  
      const input: InputCreateProductDto = {
        type: 'a',
        name: 'Product 1',
        price: 10
      }
  
      const createProduct = await useCase.execute(input)
  
      const output: OutputCreateProductDto = {
        id: expect.any(String),
        name: input.name,
        price: input.price
      }
  
      expect(createProduct).toEqual(output)
    })
  })