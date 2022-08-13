import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BillboardsService } from './billboards.service';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';
import { Billboard } from './entities/billboard.entity';

@Controller('billboards')
@ApiTags('billboards')
export class BillboardsController {
  constructor(private readonly billboardsService: BillboardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new billboard' })
  create(@Body() createBillboardDto: CreateBillboardDto) {
    return this.billboardsService.create(createBillboardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all billboards' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search: string) {
    if (search) {
      return this.billboardsService.search(search);
    }
    return this.billboardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get billboard by id' })
  @ApiOkResponse({
    description: 'The billboard record by id',
    type: Billboard,
  })
  findOne(@Param('id') id: string) {
    return this.billboardsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update billboard by id' })
  update(
    @Param('id') id: string,
    @Body() updateBillboardDto: UpdateBillboardDto,
  ) {
    return this.billboardsService.update(+id, updateBillboardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete billboard by id' })
  remove(@Param('id') id: string) {
    return this.billboardsService.remove(+id);
  }
}
