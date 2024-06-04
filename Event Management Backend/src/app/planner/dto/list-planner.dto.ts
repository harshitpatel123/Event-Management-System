import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ListPlannerDto {

    @ApiProperty({ description: 'enter page Name', required: false})
    @IsOptional()
    @IsString()
    business_name: string;

    @ApiProperty({ description: 'Average price', required: false})
    @IsOptional()
    @IsString()
    average_price: string;

}