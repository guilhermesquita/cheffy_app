import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string

export class JwtService {
    public generateToken(sub: {id: string}){
        const sign = jwt.sign({sub: sub.id}, JWT_SECRET, {expiresIn: '7d'})
        return sign
    }
}