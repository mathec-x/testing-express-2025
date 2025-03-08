export class CacheService {
    private cache: Map<string, any>;

    constructor() {
        this.cache = new Map();
    }

    set(key: string, value: any, ttl?: number): void {
        this.cache.set(key, value);
        if (ttl) {
            setTimeout(() => {
                this.cache.delete(key);
            }, ttl);
        }
    }

    get(key: string): any | null {
        return this.cache.has(key) ? this.cache.get(key) : null;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }
}