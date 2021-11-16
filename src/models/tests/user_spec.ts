import Client from '../../database';
import { UserStore } from '../user';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const user = new UserStore();

describe('User model', () => {
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
    expect(user.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const createdUser = await user.create({
      firstName: 'Bella',
      lastName: 'Choi',
      password: 'password0000',
    });

    expect(createdUser.id).toBeDefined();
    expect(createdUser.firstName).toEqual('Bella');
    expect(createdUser.lastName).toEqual('Choi');
    expect(createdUser.password).toEqual('password0000');
  });
  //   afterAll(async () => {
  //     try {
  //       const conn = await Client.connect();
  //       const sql = 'DELETE FROM users';
  //       await conn.query(sql);
  //     } catch (err) {
  //       throw new Error(`Could not remove users. Error ${err}`);
  //     }
  //   });

  it('create method should add a user and return hashed password', async () => {
    const result = await store.create({
      first_name: 'Jane',
      last_name: 'Doe',
      password: 'Password123!',
    });
    expect(
      bcrypt.compareSync('Password123!' + BCRYPT_PASSWORD, result.password)
    ).toBeTrue();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toEqual(2);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(2);
    expect(result.first_name).toEqual('Jane');
  });
});
