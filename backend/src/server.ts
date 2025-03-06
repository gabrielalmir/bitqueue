import { app } from "./app";
import { env } from "./config/env";

async function main() {
    try {
        await app.listen({ port: env.PORT, host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${env.PORT}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

main();
