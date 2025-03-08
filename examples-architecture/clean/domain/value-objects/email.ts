class Email {
    private readonly value: string;

    constructor(value: string) {
        this.validateEmail(value);
        this.value = value;
    }

    private validateEmail(value: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("Invalid email format");
        }
    }

    public getValue(): string {
        return this.value;
    }
}