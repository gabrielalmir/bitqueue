import type { FastifyReply, FastifyRequest } from "fastify";
import type { HttpContext } from "../../domain/contexts/http.context";

export class FastifyAdapter implements HttpContext {
    constructor(
        private request: FastifyRequest,
        private reply: FastifyReply
    ) { }

    async getBody(): Promise<any> {
        return await this.request.body;
    }

    getParams(): Record<string, string> {
        return this.request.params as Record<string, string>;
    }

    getQuery(): Record<string, string> {
        return this.request.query as Record<string, string>;
    }

    setStatus(status: number): void {
        this.reply.status(status);
    }

    json(data: any): Response {
        return data as Response;
    }
}
