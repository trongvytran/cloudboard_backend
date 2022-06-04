import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('wards')
@ApiTags('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new ward' })
  create(@Body() createWardDto: CreateWardDto) {
    return this.wardsService.create(createWardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wards' })
  findAll() {
    return this.wardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ward by id' })
  findOne(@Param('id') id: string) {
    return this.wardsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ward by id' })
  update(@Param('id') id: string, @Body() updateWardDto: UpdateWardDto) {
    return this.wardsService.update(+id, updateWardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete ward by id' })
  remove(@Param('id') id: string) {
    return this.wardsService.remove(+id);
  }
}
