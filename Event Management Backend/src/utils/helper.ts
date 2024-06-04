import { IsEnum, IsNumberString, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class PaginateDto {
    @ApiProperty({ required: false, type: Number, example: 1 })
    @IsOptional()
    @ValidateIf((v) => v.page !== '')
    @IsNumberString()
    page: number;

    @ApiProperty({ required: false, type: Number, example: 10 })
    @IsOptional()
    @ValidateIf((v) => v.limit !== '')
    @IsNumberString()
    limit: number;

    @ApiProperty({ required: false, type: String, example: '' })
    @IsOptional()
    @IsString()
    search: string;

    @ApiProperty({ required: false, enum: SortOrder })
    @IsOptional()
    @ValidateIf((v) => v.order_by_value !== '')
    @IsEnum(SortOrder)
    sort_order: SortOrder;
}