import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlannerDto {

    @ApiProperty({ description: 'Enter user ID', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ description: 'Enter planner name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Enter email', example: 'john@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Enter contact number', example: 1234567890 })
    @IsNumber()
    @IsNotEmpty()
    contact: number;

    @ApiProperty({ description: 'Enter business name', example: 'ABC Events' })
    @IsString()
    @IsNotEmpty()
    business_name: string;

    @ApiProperty({ description: 'Enter business description', example: 'We specialize in corporate events.' })
    @IsString()
    business_description?: string;

    @ApiProperty({ description: 'Enter portfolio link', example: 'https://portfolio.example.com' })
    @IsString()
    portfolio_link?: string;

    @ApiProperty({ description: 'Enter average price', example: 20000 })
    @IsNumber()
    @IsNotEmpty()
    average_price: number;

    @ApiProperty({ description: 'Enter pricing information', example: 'Contact for pricing details.' })
    @IsString()
    pricing_info?: string;

    @ApiProperty({ description: 'Enter services offered', example: 'Corporate events, weddings' })
    @IsString()
    services_offered?: string;

}
