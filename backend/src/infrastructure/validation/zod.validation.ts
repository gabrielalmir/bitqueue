import { ZodSchema } from 'zod';
import type { Validation } from '../../domain/validation/validation';

export class ZodValidationAdapter<T> implements Validation<T> {
    constructor(private schema: ZodSchema<T>) { }

    async validate(data: unknown) {
        const { data: parsedData, error } = await this.schema.safeParseAsync(data);

        if (error) {
            throw new Error(error.errors.map(err => err.message).join(', '));
        }

        return parsedData;
    }
}
