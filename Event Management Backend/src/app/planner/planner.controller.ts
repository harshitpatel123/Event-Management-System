import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromiseResponse, errorResponse, successResponse } from 'src/utils/response';
import { I18n, I18nContext } from 'nestjs-i18n';
import { errorLog } from 'src/logger/logger.service';
import { ListPlannerDto } from './dto/list-planner.dto';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { plannerService } from './planner.service';

@ApiTags('Planner')
@Controller('/planner')
export class plannerController {

    constructor(private readonly plannerService: plannerService) { }

    @Get('/list')
    @ApiResponse({ status: HttpStatus.OK, description: 'Planner Listed successfully.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async listPlanner(@I18n() i18n: I18nContext, @Query() listPlannerDto?: ListPlannerDto): PromiseResponse {
        try {
            const planners = await this.plannerService.listPlanner(listPlannerDto);
            return successResponse(i18n.t(`lang.planner.list`), planners);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }
 
    @Post('/create')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Planner created successfully.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async createPlanner(@Body() createPlannerDto: CreatePlannerDto, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const planner = await this.plannerService.createPlanner(createPlannerDto);
            return successResponse(i18n.t(`lang.planner.create`), planner);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Put('/update/:planner_id')
    @ApiResponse({ status: HttpStatus.OK, description: 'planner updated successfully.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'planner not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async updatePlanner(@Param('planner_id', ParseIntPipe) planner_id: number, @Body() createPlannerDto: CreatePlannerDto, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const plannerExist = await this.plannerService.findPlanner(planner_id);
            if (!plannerExist) {
                throw new Error(i18n.t(`lang.404_error`));
            }
            await this.plannerService.updatePlanner(planner_id, createPlannerDto);
            return successResponse(i18n.t(`lang.planner.update`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Get('/:planner_id')
    @ApiResponse({ status: 200, description: 'planner fetched successfully.' })
    @ApiResponse({ status: 404, description: 'planner not found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async findplanner(@Param('planner_id', ParseIntPipe) planner_id: number, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const planner = await this.plannerService.findPlanner(planner_id);
            if (planner) {
                return successResponse(i18n.t(`lang.planner.fetch`), planner);
            }
            throw new NotFoundException(i18n.t(`lang.planner.not_found`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Delete('/delete/:planner_id')
    @ApiResponse({ status: HttpStatus.OK, description: 'planner deleted successfully.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'planner not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async deletePlanner(@Param('planner_id', ParseIntPipe) planner_id: number, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const plannerExist = await this.plannerService.findPlanner(planner_id);
            if (!plannerExist) {
                throw new Error(i18n.t(`lang.404_error`));
            }
            await this.plannerService.deletePlanner(planner_id);
            return successResponse(i18n.t(`lang.planner.delete`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }
}
