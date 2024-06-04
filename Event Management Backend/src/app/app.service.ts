import { Injectable } from '@nestjs/common';
import { infoLog } from 'src/logger/logger.service';

@Injectable()
export class AppService {
    async getHello(): Promise<string> {
        infoLog('service Log coming');
        return 'Hello World!';
    }
}
