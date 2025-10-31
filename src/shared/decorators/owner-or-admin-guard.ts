import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
    constructor (private readonly targetIdParam: string) {}

    canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;
    const targetId = request.params[this.targetIdParam];

    if (user.userId !== targetId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
    }

    return true;
  }
}