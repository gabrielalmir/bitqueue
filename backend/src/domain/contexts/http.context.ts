export interface HttpContext {
    getBody(): Promise<any>;
    getParams(): Record<string, string>;
    getQuery(): Record<string, string>;
    setStatus(status: number): void;
    json(data: any): Response;
}
