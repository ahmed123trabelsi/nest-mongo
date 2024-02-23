import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<User>,@InjectModel(UserSettings.name)private userSettingsModel:Model<UserSettings>){}
    async createUser({settings,...createuserdto}:CreateUserDto){
        if(settings){
           const newSettings=new this.userSettingsModel(settings)
          const savedNewSettings= await newSettings.save()
          const newUser=new this.userModel({
            ...createuserdto,
            settings:savedNewSettings._id
          })
          return newUser.save()
        }
const newUser=new this.userModel(createuserdto);
return newUser.save();
    }
    getUsers(){
        return this.userModel.find();
    }
    getUserById(id:string){
        return this.userModel.findById(id);
    }
    updateUser(id:string,updateuserdto:UpdateUserDto){
      return  this.userModel.findByIdAndUpdate(id,updateuserdto,{new:true})
    }
}
