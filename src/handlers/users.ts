import { User, UserStore } from '../models/user';
import express, { Request, Response } from 'express';
import dotent from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

dotent.config();

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/new', create);
  app.post('/users/authenticate', authenticate);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

const store = new UserStore();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader;
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    next();
  } catch (error) {
    res.status(401).json(`Access denied, invalid token: Error: ${error} `);
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
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);

    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`invalid token ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error });
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
