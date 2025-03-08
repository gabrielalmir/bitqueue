import { createId } from "@paralleldrive/cuid2";
import type { IdGeneratorPort } from "../../application/generators/id.generator";

export class CuidAdapter implements IdGeneratorPort {
    generate(): string {
        return createId();
    }
}
