import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserJwtDto } from '../auth/dto/auth.dto';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  overview(@UserReq() user: UserJwtDto) {
    return this.dashboardService.overview(user.id);
  }
}
