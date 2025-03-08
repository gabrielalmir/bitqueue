import type { Queue } from "../../domain/entities/queue";
import type { IdGeneratorPort } from "../generators/id.generator";

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

export class QueueModelFactory {
  constructor(private idGenerator: IdGeneratorPort) { }

  create(props: QueueModelCreateCommandProps): QueueModel {
    return new QueueModel({
      id: this.idGenerator.generate(),
      name: props.name,
      userId: props.userId,
    });
  }

  createWithProps(props: QueueModelConstructorProps): QueueModel {
    return new QueueModel(props);
  }
}

export class QueueModel implements Queue {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;

  constructor(props: QueueModelConstructorProps) {
    if (!props.id) {
      throw new Error('ID must be provided')
    };

    this.id = props.id;
    this.name = props.name;
    this.userId = props.userId;
    this.createdAt = props.createdAt ?? new Date();
  }
}

