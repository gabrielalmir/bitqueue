import type { User } from "@prisma/client";

export interface UserRepository {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
}
