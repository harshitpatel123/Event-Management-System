import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ListEventDto {

    @ApiProperty({ description: 'Enter user_id', required: false })
    @IsOptional()
    user_id?: number;

}