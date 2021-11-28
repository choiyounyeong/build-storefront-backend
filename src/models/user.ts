import Client from '../database';
import bcrypt from 'bcrypt';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: string | number;
  firstname: string;
  lastname: string;
  password: string | number;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users. Error: ${err}`);
    }
  }

  async show(id: string | number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannnot find the user. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const pepper: string = BCRYPT_PASSWORD as string;
      const saltRounds: string = SALT_ROUNDS as string;
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Failed to add new user, ${u.lastname} ${u.firstname}. Error: ${err}`
      );
    }
  }

  async authenticate(u: User): Promise<User | null> {
    const pepper: string = BCRYPT_PASSWORD as string;
    const salt: string = SALT_ROUNDS as string;

    const conn = await Client.connect();
    const sql =
      'SELECT password FROM users WHERE first_name = ($1) AND last_name = ($2);';
    const result = await conn.query(sql, [u.firstname, u.lastname]);
    console.log(u.password + pepper);
    conn.release();

    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);

      if (bcrypt.compareSync(u.password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }

  async destroy(id: string | number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete the user. Error: ${err}`);
    }
  }
}
