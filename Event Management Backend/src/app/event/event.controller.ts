import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PromiseResponse, errorResponse, successResponse } from 'src/utils/response';
import { errorLog } from 'src/logger/logger.service';
import { EventService } from './event.service';
import { ListEventDto } from './dto/list-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Event')
@Controller('event')
export class EventController {

    constructor(private readonly eventSevice: EventService) { }

    @Get('/list')
    @ApiResponse({ status: HttpStatus.OK, description: 'Event Listed successfully.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async listEvent(@I18n() i18n: I18nContext, @Query() listEventDto?: ListEventDto): PromiseResponse {
        try {
            const events = await this.eventSevice.listEvent(listEventDto);
            return successResponse(i18n.t(`lang.event.list`), events);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Post('/insert')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Event created successfully.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async insertEvent(@Body() createEventDto: CreateEventDto, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const event = await this.eventSevice.insertEvent(createEventDto);
            return successResponse(i18n.t(`lang.event.create`), event);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }

    @Get('/:event_id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Event fetched successfully.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async findEvent(@Param('event_id', ParseIntPipe) event_id: number, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const event = await this.eventSevice.findEvent(event_id);
            if (event) {
                return successResponse(i18n.t(`lang.event.list`),event);
            }
            throw new NotFoundException(i18n.t(`lang.404_error`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }
 
    @Delete('/delete/:event_id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Event deleted successfully.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    async deleteEvent(@Param('event_id', ParseIntPipe) event_id: number, @I18n() i18n: I18nContext): PromiseResponse {
        try {
            const eventExist = await this.eventSevice.findEvent(event_id);
            if (!eventExist.event_id) {
                throw new NotFoundException(i18n.t(`lang.404_error`));
            }
            await this.eventSevice.deleteEvent(event_id);
            return successResponse(i18n.t(`lang.event.delete`));
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(error.message);
        }
    }
}
