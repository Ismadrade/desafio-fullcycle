import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto"
import { UpdateProductUseCase } from "./update.product.usecase"

describe('Update product use case integration test', () => {
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
  
    it('should be able to update a product', async () => {
      const productRepository = new ProductRepository()
  
      const product = ProductFactory.create('a', 'Product 1', 10)
  
      await productRepository.create(new Product(product.id, product.name, product.price))
  
      const useCase = new UpdateProductUseCase(productRepository)
  
      const input: InputUpdateProductDto = {
        id: product.id,
        name: 'Product 1 - UPDATED',
        price: 10
      }
  
      const updateProduct = await useCase.execute(input)
  
      const output: OutputUpdateProductDto = {
        id: product.id,
        name: input.name,
        price: input.price
      }
  
      expect(updateProduct).toEqual(output)
    })
  })