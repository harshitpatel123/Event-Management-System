import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ListUserDto {

    @ApiProperty({ description: 'enter username', required: false})
    @IsOptional()
    @IsString()
    user_name: string;

}