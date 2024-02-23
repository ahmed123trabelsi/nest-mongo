import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new this.adminModel({ username, password: hashedPassword });
    return admin.save();
  }

  async login(username: string, password: string) {
    const admin = await this.adminModel.findOne({ username }).exec();
    if (!admin) {
      throw new Error('Admin not found');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.sign({ username: admin.username });
    return { token };
  }
}

