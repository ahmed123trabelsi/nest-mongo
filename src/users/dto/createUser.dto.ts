import { IsBoolean, IsNotEmpty,IsOptional,IsString, ValidateNested } from "class-validator";
export class CreateUserSettingsDto{
    @IsOptional()
    @IsBoolean()
    recieveNotifications?:boolean;
    @IsOptional()
    @IsBoolean()
    recieveEmails?:boolean;
    @IsOptional()
    @IsBoolean()
    recieveSMS?:boolean;
}
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsOptional()
    @IsString()
    displayName?:string;
    @IsOptional()
    @ValidateNested()
    settings?:CreateUserSettingsDto;
}