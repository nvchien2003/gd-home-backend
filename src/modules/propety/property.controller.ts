import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreatePropertyDto,
  GetPropertiesQueryDto,
  PropertyResponseDto,
  UpdatePropertyDto,
} from './dto/property.dto';
import { PropertyService } from './property.service';

@Controller('properties')
@ApiTags('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({
    summary:
      'List properties with pagination, search, type/price filters, and sorting',
  })
  @ApiOkResponse({ type: PropertyResponseDto, isArray: true })
  async findAll(@Query() query: GetPropertiesQueryDto) {
    return this.propertyService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by id' })
  @ApiOkResponse({ type: PropertyResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create property' })
  @ApiCreatedResponse({ type: PropertyResponseDto })
  async create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update property' })
  @ApiOkResponse({ type: PropertyResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete property' })
  @ApiOkResponse({ type: PropertyResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.remove(id);
  }
}
