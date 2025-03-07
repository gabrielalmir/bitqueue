import { createId } from "@paralleldrive/cuid2";
import type { User } from "../core/entities/user";

export type UserModelConstructorProps = {
  id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export type UserModelCreateCommandProps = {
  email: string;
  password: string;
}

export class UserModel implements User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(props: UserModelConstructorProps) {
    this.id = props.id ?? createId();
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: UserModelCreateCommandProps) {
    return new UserModel(props);
  }
}
