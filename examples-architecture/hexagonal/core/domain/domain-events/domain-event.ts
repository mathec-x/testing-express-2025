export abstract class DomainEvent {
    constructor(
        public readonly occurredOn: Date = new Date()
    ) {}
}