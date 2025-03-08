class User {
    constructor(
        public id: string,
        public name: string,
        public email: string
    ) {
        this.validateEmail(email);
    }

    private validateEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
    }

    changeEmail(newEmail: string) {
        this.validateEmail(newEmail);
        this.email = newEmail;
    }

    changeName(newName: string) {
        if (!newName) {
            throw new Error("Name cannot be empty");
        }
        this.name = newName;
    }
}