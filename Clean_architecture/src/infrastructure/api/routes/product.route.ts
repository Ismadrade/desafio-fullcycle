import express, { Request, Response } from 'express'
import { InputCreateProductDto } from '../../../usecase/product/create/create.product.dto'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { ListProductsUseCase } from '../../../usecase/product/list/list.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'

export const productRouter = express.Router()

productRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository())

  try {
    const product: InputCreateProductDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price
    }

    const output = await useCase.execute(product)

    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRouter.get('/', async (_: Request, res: Response) => {
  const useCase = new ListProductsUseCase(new ProductRepository())

  try {
    const output = await useCase.execute({})

    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})