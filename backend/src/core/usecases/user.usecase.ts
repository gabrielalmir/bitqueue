import type { User } from "../entities/user";

export interface UserUsecase {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<User>;
}
