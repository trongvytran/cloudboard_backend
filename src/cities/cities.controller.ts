import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {JWTAuthGuard} from '../auth/jwt-auth.guard';
import {CitiesService} from './cities.service';
import {CreateCityDto} from './dto/create-city.dto';
import {UpdateCityDto} from './dto/update-city.dto';

@Controller('cities')
@ApiTags('cities')
// @UseGuards(JWTAuthGuard)
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {
    }

    @Post()
    @ApiOperation({summary: 'Create new city'})
    create(@Body() createCityDto: CreateCityDto) {
        return this.citiesService.create(createCityDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all cities'})
    findAll() {
        return this.citiesService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get city by id'})
    findOne(@Param('id') id: string) {
        return this.citiesService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update city by id'})
    update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
        return this.citiesService.update(+id, updateCityDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete city by id'})
    remove(@Param('id') id: string) {
        return this.citiesService.remove(+id);
    }
}
