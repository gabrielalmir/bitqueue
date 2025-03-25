import { createId } from "@paralleldrive/cuid2";
import type { User } from "../../domain/entities/user";
import type { IdGeneratorPort } from "../generators/id.generator";

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

export class UserModelFactory {
  constructor(private readonly idGenerator: IdGeneratorPort) { }

  create(props: UserModelCreateCommandProps): UserModel {
    return new UserModel({
      id: this.idGenerator.generate(), // Usa a porta para gerar o ID
      email: props.email,
      password: props.password,
    });
  }

  createWithProps(props: UserModelConstructorProps): UserModel {
    return new UserModel(props);
  }
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
}
