import * as jwt from 'jsonwebtoken'

type Payload = {
  id: number,
};

export default class JWT {
	static sign(payload: Payload): string {
		return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret')
	}

	static validate(token: string): Payload | string {
		const tokenCheck = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as Payload
		return tokenCheck
	}

	static decode(token: string): jwt.JwtPayload | Payload | string | null {
		const tokenDecode = jwt.decode(token)
		return tokenDecode
	}
}
