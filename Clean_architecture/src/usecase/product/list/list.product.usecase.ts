import Product from "../../../domain/product/entity/product"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputListProductsDto, OutputListProductsDto } from "./list.product.dto"

export class ListProductsUseCase {
    private productRepository: ProductRepository
  
    constructor(productRepository: ProductRepository) {
      this.productRepository = productRepository
    }
  
    async execute(_: InputListProductsDto): Promise<OutputListProductsDto> {
      const products = await this.productRepository.findAll()
  
      return OutPutMapper.toOutput(products)
    }
  }
  
  class OutPutMapper {
    static toOutput(products: Product[]): OutputListProductsDto {
      return {
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price
        }))
      }
    }
  }