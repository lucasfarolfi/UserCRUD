import { IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsString()
    @Length(15, 15)
    readonly phone: string;

    @IsString()
    readonly birthdate: string;
}
