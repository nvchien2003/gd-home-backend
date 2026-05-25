import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserJwtDto } from '../auth/dto/auth.dto';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('subscriptions')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('me')
  me(@UserReq() user: UserJwtDto) {
    return this.subscriptionsService.me(user.id);
  }
}
