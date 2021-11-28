import { ProductStore } from '../models/product';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { json } from 'body-parser';

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products/:id/new', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

const product = new ProductStore();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json('Access denied, invalid token');
  }
};

const index = async (_req: Request, res: Response) => {
  const products = await product.index();
  res.json(products);
};

const show = async (_req: Request, res: Response) => {
  const productList = await product.show(_req.params.id);
  res.json(productList);
};

const create = async (_req: Request, res: Response) => {
  try {
    const newProduct = await product.create({
      name: _req.params.name,
      price: _req.params.price,
    });
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await product.destroy(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default productRoutes;
