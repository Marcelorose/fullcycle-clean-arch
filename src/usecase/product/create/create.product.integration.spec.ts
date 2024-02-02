import { Sequelize } from 'sequelize-typescript';

import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const input = {
      type: "a",
      name: "Product 1",
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toEqual(input.name);
    expect(result.price).toEqual(input.price);
  });
});
