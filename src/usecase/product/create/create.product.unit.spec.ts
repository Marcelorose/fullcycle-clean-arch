import CreateProductUseCase from './create.product.usecase';

const input = {
  type: "a",
  name: "Product A",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const localInput = {
      ...input,
      name: "",
    };

    await expect(productCreateUseCase.execute(localInput)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const localInput = {
      ...input,
      price: -10,
    };

    await expect(productCreateUseCase.execute(localInput)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
