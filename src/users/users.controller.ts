import { Controller,Post ,Body,UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Put} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    @Post()
    @UsePipes(new ValidationPipe())//enbales validation locally
   createUser(@Body()createuserdto:CreateUserDto){
    console.log(createuserdto);
    return this.usersService.createUser(createuserdto);
   }
   @Get()
   getUsers(){
    return this.usersService.getUsers();
   }
   @Get('/:id')
   async getUserById(@Param('id') id:string){
   const isValid= mongoose.Types.ObjectId.isValid(id)
   if(!isValid) throw new HttpException('user not found',404) 
    const findUser= await this.usersService.getUserById(id);
    if(!findUser) throw new HttpException('user not found',404)
    return findUser;
   }
   @Patch(':id')
   @UsePipes(new ValidationPipe())
   async updateUser(@Param('id')id:string,@Body()updateuserdto:UpdateUserDto){
    const isValid= mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException('INVALID id',400) 
    const updatedUser= await this.usersService.updateUser(id,updateuserdto)
    if(!updatedUser) throw new HttpException('user not found',404)
    return updatedUser;

   }

}


