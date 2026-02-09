import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request?.user?.isAdmin){
            throw new HttpException('Only admins have access',HttpStatus.FORBIDDEN);
        }
        return true;
    }
}