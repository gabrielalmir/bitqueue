import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

export const db = new PrismaClient({ datasourceUrl: env.DATABASE_URL });

