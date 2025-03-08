import { Database } from 'bun:sqlite';
import { env } from "../../application/config/env";

export const db = new Database(env.DATABASE_URL, { create: false });
