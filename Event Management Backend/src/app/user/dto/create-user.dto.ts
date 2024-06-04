import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ description: 'First name', example: 'John' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ description: 'Last name', example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ description: 'Email', example: 'john@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Contact number', example: 1234567890 })
    @IsNumber()
    @IsNotEmpty()
    contact: number;

    @ApiProperty({ description: 'Username', example: 'johndoe' })
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ description: 'Password', example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
