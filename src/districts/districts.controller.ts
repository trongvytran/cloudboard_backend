import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('districts')
@ApiTags('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new district' })
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtsService.create(createDistrictDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all districts' })
  findAll() {
    return this.districtsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get district by id' })
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update district by id' })
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtsService.update(+id, updateDistrictDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete district by id' })
  remove(@Param('id') id: string) {
    return this.districtsService.remove(+id);
  }
}
