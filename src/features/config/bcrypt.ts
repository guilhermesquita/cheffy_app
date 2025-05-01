import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class PasswordHasher {
    public async hashPassword(param: {password: string}){
        const hashedPassword = await bcrypt.hash(param.password, SALT_ROUNDS);
        return hashedPassword
    }

    public async validatePassword(param: {password: string, passwordHashed: string}){
        const password = await bcrypt.compare(param.password, param.passwordHashed)
        return password
    }
}