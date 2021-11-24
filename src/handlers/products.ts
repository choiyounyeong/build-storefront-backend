import { ProductStore } from '../models/product';
import express, { Request, Response } from 'express';

const productRoutes = (app: express.Application) => {
  app.get('/', index);
  app.get('/products/:id', show);
  app.post('/products/:id/new', create);
  app.delete('/products/:id', destroy);
};

const product = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await product.index();
  res.json(products);
};

const show = async (_req: Request, res: Response) => {
  const productList = await product.show(_req.params.id);
  res.json(productList);
};

const create = async (_req: Request, res: Response) => {
  const newProduct = await product.create({
    name: _req.params.name,
    price: _req.params.price,
  });
  res.json(newProduct);
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await product.delete(req.body.id);
  res.json(deleted);
};

export default productRoutes;
