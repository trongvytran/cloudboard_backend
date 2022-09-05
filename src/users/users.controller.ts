import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {JWTAuthGuard} from '../auth/jwt-auth.guard';
import {Role} from '../auth/role.decorator';

@Controller('users')
@ApiTags('users')
// @UseGuards(JWTAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @ApiOperation({
        summary: 'Create new user',
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Role('Admin')
    @ApiOperation({summary: 'Get all users'})
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by id'})
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update user by id'})
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user by id'})
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
