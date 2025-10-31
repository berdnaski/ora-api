import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository, UserUpdateData } from "../domain/user.repository.interface";
import { User } from "../domain/user.entity";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string, data: UserUpdateData): Promise<User> {
        const existing = await this.userRepository.findById(id);

        if (!existing) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return this.userRepository.update(id, data);
    }
}