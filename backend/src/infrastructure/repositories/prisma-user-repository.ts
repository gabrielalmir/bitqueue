import { PrismaClient } from '@prisma/client';
import type { UserRepository } from '../../domain/repositories/user-repository';
import type { CreateUserInput, User } from '../../domain/types';

export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(input: CreateUserInput): Promise<User> {
        return this.prisma.user.create({
            data: input,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
