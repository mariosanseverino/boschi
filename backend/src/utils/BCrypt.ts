import bcrypt from 'bcrypt'

export default class BCrypt {
	static async compare(password: string, hashcrypt: string): Promise<boolean> {
		const verify = await bcrypt.compare(password, hashcrypt)
		return verify
	}

	static async hash(password: string, salt: number): Promise<string> {
		const encrypt = await bcrypt.hash(password, salt)
		return encrypt
	}
}
