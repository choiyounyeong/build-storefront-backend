import { User, UserStore } from '../models/user';
import express, { Request, Response, NextFunction } from 'express';
import dotent from 'dotenv';
import jwt from 'jsonwebtoken';

dotent.config();

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/:id/new', verifyAuthToken, create);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

const store = new UserStore();

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

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const userList = await store.show(_req.params.id);
  res.json(userList);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`invalid token ${err}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.destroy(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default userRoutes;
