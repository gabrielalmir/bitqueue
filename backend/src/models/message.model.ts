import { createId } from "@paralleldrive/cuid2";
import type { Message, MessageStatus } from "../core/entities/message";

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

  static create(props: MessageModelCreateCommandProps) {
    return new MessageModel(props);
  }
}
