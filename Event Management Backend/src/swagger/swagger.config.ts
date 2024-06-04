import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('QE-TEAM-CRM')
    .setDescription('The qe-team-crm project API')
    .setVersion('1.0')
    .build();

