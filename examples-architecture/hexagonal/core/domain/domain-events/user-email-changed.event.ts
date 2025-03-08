export class UserEmailChangedEvent {
    constructor(
        public readonly userId: string,
        public readonly newEmail: string,
        public readonly occurredOn: Date = new Date()
    ) {}
}