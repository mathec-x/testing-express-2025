// This file defines the UserAggregate, which encapsulates the User entity and its related operations.

import { User } from "../entities/user";
import { Email } from "../value-objects/email";
import { UserCreatedEvent } from "../domain-events/user-created.event";
import { UserEmailChangedEvent } from "../domain-events/user-email-changed.event";

export class UserAggregate {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    changeEmail(newEmail: string): void {
        const email = new Email(newEmail);
        this.user.changeEmail(email);
        this.emitEmailChangedEvent();
    }

    private emitEmailChangedEvent(): void {
        // Logic to emit UserEmailChangedEvent
        const event = new UserEmailChangedEvent(this.user.id, this.user.email);
        // Emit the event (implementation depends on the event bus used)
    }

    // Additional methods related to user operations can be added here
}