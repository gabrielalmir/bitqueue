import { createId } from "@paralleldrive/cuid2";
import type { Message, MessageStatus } from "../../domain/entities/message";
import type { IdGeneratorPort } from "../generators/id.generator";

export type MessageModelConstructorProps = {
  id?: string;
  queueId: string;
  content: string;
  status: MessageStatus;
  enqueuedAt?: Date;
  visibilityTimeoutAt?: string | null;
}

export type MessageModelCreateCommandProps = {
  queueId: string;
  content: string;
  status: MessageStatus;
  visibilityTimeoutAt?: string | null;
}

export class MessageModelFactory {
  constructor(private idGenerator: IdGeneratorPort) { }

  create(props: MessageModelCreateCommandProps): MessageModel {
    return new MessageModel({
      id: this.idGenerator.generate(),
      queueId: props.queueId,
      content: props.content,
      status: props.status,
      visibilityTimeoutAt: props.visibilityTimeoutAt,
    });
  }

  createWithProps(props: MessageModelConstructorProps): MessageModel {
    return new MessageModel(props);
  }
}

export class MessageModel implements Message {
  id: string;
  queueId: string;
  content: string;
  status: MessageStatus;
  enqueuedAt: Date;
  visibilityTimeoutAt: string | null;

  constructor(props: MessageModelConstructorProps) {
    this.id = props.id ?? createId();
    this.queueId = props.queueId;
    this.content = props.content;
    this.status = props.status;
    this.enqueuedAt = props.enqueuedAt ?? new Date();
    this.visibilityTimeoutAt = props.visibilityTimeoutAt ?? null;
  }
}
