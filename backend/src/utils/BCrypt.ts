import bcrypt from 'bcrypt';

export default class BCrypt {
  static async compare(password: string, hashcrypt: string): Promise<boolean> {
    const verify = await bcrypt.compare(password, hashcrypt);
    return verify;
  }
}
