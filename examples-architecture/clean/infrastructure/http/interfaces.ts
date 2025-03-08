export interface HttpRequest {
    body?: any;
    params?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, string>;
}

export interface HttpResponse {
    status(code: number): this;
    json(data: any): this;
    send(data: any): this;
}