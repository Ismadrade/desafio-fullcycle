import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import { FindProductUseCase } from "./find.product.usecase"

describe('Find product use case integration test', () => {
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
  
    it('should be able to find product by id', async () => {
      const productRepository = new ProductRepository()
  
      const useCase = new FindProductUseCase(productRepository)
  
      const product = ProductFactory.create('a', 'Product 1', 10)
  
      await productRepository.create(new Product(product.id, product.name, product.price))
  
      const input: InputFindProductDto = {
        id: product.id
      }
  
      const createProduct = await useCase.execute(input)
  
      const output: OutputFindProductDto = {
        id: product.id,
        name: product.name,
        price: product.price
      }
  
      expect(createProduct).toEqual(output)
    })
  })