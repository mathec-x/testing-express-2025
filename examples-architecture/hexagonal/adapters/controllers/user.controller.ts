export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase, private updateUserUseCase: UpdateUserUseCase) {}

    async create(ctx: Context) {
        const { name, email } = ctx.request.body;
        const user = await this.createUserUseCase.execute(name, email);
        ctx.body = { id: user.id, name: user.name, email: user.email };
    }

    async update(ctx: Context) {
        const { id, email } = ctx.request.body;
        const updatedUser = await this.updateUserUseCase.execute(id, email);
        ctx.body = { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email };
    }
}