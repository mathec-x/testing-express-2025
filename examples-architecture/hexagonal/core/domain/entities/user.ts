class User {
    constructor(
        public readonly id: string,
        public email: string
    ) {}

    changeEmail(newEmail: string) {
        if (!this.isValidEmail(newEmail)) {
            throw new Error("Invalid email");
        }
        this.email = newEmail;
    }

    private isValidEmail(email: string): boolean {
        return email.includes("@");
    }
}

export { User };