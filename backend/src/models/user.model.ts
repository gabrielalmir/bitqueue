import { createId } from "@paralleldrive/cuid2";

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

export class UserModel {
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
