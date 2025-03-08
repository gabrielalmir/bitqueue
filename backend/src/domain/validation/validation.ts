export interface Validation<T> {
    validate(data: unknown): Promise<T>;
}
