import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../domain/user.repository.interface";

@Injectable()
export class RemoveUserUseCase {
    constructor (private readonly userRepository: IUserRepository) {}

    async remove(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        await this.userRepository.remove(id);
    }
}