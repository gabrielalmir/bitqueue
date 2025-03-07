export class NumberUtils {
    static value(input: number, locale = 'en-us'): string {
        return input.toLocaleString(locale);
    }
}
