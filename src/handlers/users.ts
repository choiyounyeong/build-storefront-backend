import { User, UserStore } from '../models/user';
import express, { Router, Request, Response } from 'express';
import dotent from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

dotent.config();

const tokenSecret: Secret = process.env.TOKEN_SECRET as Secret;

const store = new UserStore();
const users = express.Router();

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`invalid token ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const Userroutes = (app: express.Application) => {
  app.get('/users', index);
};

export default Userroutes;
