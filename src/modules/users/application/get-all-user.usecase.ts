import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../domain/user.repository.interface";
import { User } from "../domain/user.entity";

@Injectable()
export class GetAllUserUseCase {
    constructor (private readonly userRepository: IUserRepository) {}

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        if (!users || users.length === 0) {
            throw new NotFoundException('Nenhum usuário encontrado.');
        }

        return users;
    }
}