
import { IsNotEmpty, IsString, IsObject } from "class-validator"

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    tag: string

    @IsNotEmpty()
    @IsString()
    group: string

    @IsObject()
    metaData: Object
}
