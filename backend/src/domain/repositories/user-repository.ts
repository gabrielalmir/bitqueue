import type { CreateUserInput, User } from '../types';

export interface UserRepository {
    create(input: CreateUserInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
