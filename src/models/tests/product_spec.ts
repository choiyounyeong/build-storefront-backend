import { Product, ProductStore } from '../product';

const product = new ProductStore();

describe('Product model', async () => {
  it('should have index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have method create', () => {
    expect(product.create).toBeDefined();
  });

  it('should have method delete', () => {
    expect(product.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await product.create({
      name: 'Montblanc Wallet',
      price: 230,
    });

    expect(result.id).toBeDefined();
    expect(result.name).toEqual('Montblanc Wallet');
    expect(result.price).toEqual('230');
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([
      {
        id: '1',
        name: 'Montblanc Wallet',
        price: 230,
      },
    ]);
  });

  it('show method should return the correct product', async () => {
    const result = await product.show('1');
    expect(result).toEqual({
      id: '1',
      name: 'Montblanc Wallet',
      price: 230,
    });
  });

  it('delete method should remove the book', async () => {
    product.delete('1');
    const result = await product.index();

    expect(result).toEqual([]);
  });
});
