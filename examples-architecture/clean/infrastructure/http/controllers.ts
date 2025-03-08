import { Context } from 'koa';
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '@/application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '@/application/use-cases/user/delete-user.use-case';
import { UserDTO } from '@/application/dto/user-dto';

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    async create(ctx: Context) {
        const userData: UserDTO = ctx.request.body;
        const user = await this.createUserUseCase.execute(userData);
        ctx.status = 201;
        ctx.body = user;
    }

    async update(ctx: Context) {
        const userId = ctx.params.id;
        const userData: UserDTO = ctx.request.body;
        const updatedUser = await this.updateUserUseCase.execute(userId, userData);
        ctx.body = updatedUser;
    }

    async delete(ctx: Context) {
        const userId = ctx.params.id;
        await this.deleteUserUseCase.execute(userId);
        ctx.status = 204; // No Content
    }
}