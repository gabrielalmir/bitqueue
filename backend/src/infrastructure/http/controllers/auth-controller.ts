import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { AuthService } from '../../../domain/services/auth-service';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    async register(server: FastifyInstance) {
        server.post('/auth/register', async (request, reply) => {
            const input = registerSchema.parse(request.body);
            const result = await this.authService.register(input);
            return reply.status(201).send(result);
        });

        server.post('/auth/login', async (request, reply) => {
            const { email, password } = loginSchema.parse(request.body);
            const result = await this.authService.login(email, password);
            return reply.send(result);
        });
    }
}
