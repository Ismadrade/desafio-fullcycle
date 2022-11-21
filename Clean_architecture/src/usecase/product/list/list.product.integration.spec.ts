import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { OutputListProductsDto } from "./list.product.dto"
import { ListProductsUseCase } from "./list.product.usecase"

describe('List products use case integration test', () => {
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
  
    it('should be able to list products', async () => {
      const productRepository = new ProductRepository()
  
      const product1 = ProductFactory.create('a', 'Product 1', 5)
  
      const product2 = ProductFactory.create('b', 'Product 2', 10)
  
      await productRepository.create(new Product(product1.id, product1.name, product1.price))
      await productRepository.create(new Product(product2.id, product2.name, product2.price))
  
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