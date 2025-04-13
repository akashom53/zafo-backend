import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto {


    @IsNotEmpty()
    @IsEmail()
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

}