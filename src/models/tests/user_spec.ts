import client from '../../database';
import { UserStore } from '../user';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PASSWORD } = process.env;

const user = new UserStore();

describe('User model', () => {
  let creadedUserId: number;
  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'DELETE FROM users';
    await conn.query(sql);
  });

  it('should have index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have create method', () => {
    expect(user.create).toBeDefined();
  });

  it('should have delete method', () => {
    expect(user.destroy).toBeDefined();
  });

  it('create method should create a user and return hased password', async () => {
    const createdUser = await user.create({
      firstname: 'Bella',
      lastname: 'Choi',
      password: 'password0000',
    });
    creadedUserId = Number(createdUser.id);
    expect(createdUser.id).toBeDefined();
    expect(createdUser.firstname).toEqual('Bella');
    expect(createdUser.lastname).toEqual('Choi');
    expect(
      bcrypt.compareSync(
        'password0000' + BCRYPT_PASSWORD,
        createdUser.password as string
      )
    ).toBeTrue();
  });

  it('index method should return a list of user', async () => {
    const result = await user.index();
    expect(result.length).toBe(1);
    expect(result[0].firstname).toEqual('Bella');
  });

  it('show method should return the correct user', async () => {
    const result = await user.show(creadedUserId);
    expect(result.firstname).toEqual('Bella');
  });

  it('destroy method should remove the user', async () => {
    const deleteUser = await user.destroy(creadedUserId);

    const conn = await client.connect();
    const sql = `SELECT * FROM users WHERE id = ${creadedUserId};`;
    const result = await conn.query(sql);
    conn.release();

    expect(result).toBeTruthy();
  });
});
