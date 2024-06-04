import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromiseResponse, errorResponse, successResponse } from 'src/utils/response';
import { I18n, I18nContext } from 'nestjs-i18n';
import { errorLog } from 'src/logger/logger.service';
import { userService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';

@ApiTags('User')
@Controller('/user')
export class userController {

    constructor(private readonly userService: userService) { }

    @Get('/list')
    @ApiResponse({ status: HttpStatus.OK, description: 'user Listed successfully.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async listUser(@I18n() i18n: I18nContext): PromiseResponse {
        try {
            const users = await this.userService.listUser();
            return successResponse(i18n.t(`lang.planner.list`), users);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Get('/login')
    async login(@I18n() i18n: I18nContext, @Query() listUserDto?: ListUserDto): PromiseResponse {
        try {
            const user = await this.userService.login(listUserDto);
            return successResponse(i18n.t(`lang.planner.list`), user);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }
 
    @Post('/create')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'user created successfully.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async createUser(@Body() createUserDto: CreateUserDto, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const user = await this.userService.createUser(createUserDto);
            return successResponse(i18n.t(`lang.user.create`), user);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Put('/update/:user_id')
    @ApiResponse({ status: HttpStatus.OK, description: 'user updated successfully.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async updateUser(@Param('user_id', ParseIntPipe) user_id: number, @Body() createUserDto: CreateUserDto, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const userExist = await this.userService.findUser(user_id);
            if (!userExist) {
                throw new Error(i18n.t(`lang.404_error`));
            }
            await this.userService.updateUser(user_id, createUserDto);
            return successResponse(i18n.t(`lang.user.update`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Get('/:user_id')
    @ApiResponse({ status: 200, description: 'user fetched successfully.' })
    @ApiResponse({ status: 404, description: 'user not found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async findUser(@Param('user_id', ParseIntPipe) user_id: number, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const user = await this.userService.findUser(user_id);
            if (user) {
                return successResponse(i18n.t(`lang.user.fetch`), user);
            }
            throw new NotFoundException(i18n.t(`lang.user.not_found`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Delete('/delete/:user_id')
    @ApiResponse({ status: HttpStatus.OK, description: 'user deleted successfully.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'user not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async deleteUser(@Param('user_id', ParseIntPipe) user_id: number, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const userExist = await this.userService.findUser(user_id);
            if (!userExist) {
                throw new Error(i18n.t(`lang.404_error`));
            }
            await this.userService.deleteUser(user_id);
            return successResponse(i18n.t(`lang.user.delete`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }
}
