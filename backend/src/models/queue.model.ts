import { createId } from "@paralleldrive/cuid2";

export type QueueModelConstructorProps = {
  id?: string;
  name: string;
  userId: string;
  createdAt?: Date;
}

export type QueueModelCreateCommandProps = {
  name: string;
  userId: string;
}

export class QueueModel {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;

  constructor(props: QueueModelConstructorProps) {
    this.id = props.id ?? createId();
    this.name = props.name;
    this.userId = props.userId;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: QueueModelCreateCommandProps) {
    return new QueueModel(props)
  }
}
