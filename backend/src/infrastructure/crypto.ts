import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function createHash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}
