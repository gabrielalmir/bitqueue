
import { compareHash, createHash } from '../../infrastructure/crypto';
import { generateToken } from '../../infrastructure/jwt';
import type { UserRepository } from '../repositories/user-repository';
import type { AuthenticatedUser, CreateUserInput, User } from '../types';

export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    async register(input: CreateUserInput): Promise<AuthenticatedUser> {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await createHash(input.password);
        const user = await this.userRepository.create({
            ...input,
            password: hashedPassword,
        });

        return this.generateAuthResponse(user);
    }

    async login(email: string, password: string): Promise<AuthenticatedUser> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await compareHash(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        return this.generateAuthResponse(user);
    }

    private generateAuthResponse(user: User): AuthenticatedUser {
        const token = generateToken({ userId: user.id });
        return {
            id: user.id,
            email: user.email,
            token,
        };
    }
}
