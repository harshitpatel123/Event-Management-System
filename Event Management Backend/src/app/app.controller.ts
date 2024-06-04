import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { successResponse, errorResponse, PromiseResponse } from 'src/utils/response';
import { errorLog, infoLog } from 'src/logger/logger.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiResponse } from '@nestjs/swagger';

@Controller('app')
export class AppController {

    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Getting welcome message successfully', })
    async getHello(@I18n() i18n: I18nContext): PromiseResponse {
        try {
            const data = await this.appService.getHello();
            infoLog('Log coming');
            return successResponse(i18n.t(`lang.welcome_message`), data);
        } catch (error) {
            errorLog(error.message, error);
            return errorResponse(i18n.t(`lang.error_message`));
        }
    }

    @Get('favicon.ico')
    getFavicon() { }
}
