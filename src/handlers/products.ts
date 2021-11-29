import { ProductStore } from '../models/product';
import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { json } from 'body-parser';

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products/new', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

const product = new ProductStore();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader;
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
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
      name: _req.body.name,
      price: _req.body.price,
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
