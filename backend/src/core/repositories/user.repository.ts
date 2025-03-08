import type { User } from "../entities/user";

export interface UserRepository {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
}
