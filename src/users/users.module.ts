import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userInfo } from 'os';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { Admin, AdminSchema } from 'src/schemas/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwtStrategy';



@Module({
    imports: [PassportModule,
      MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Admin.name, schema: AdminSchema },
        { name: UserSettings.name, schema: UserSettingsSchema },
      ]),  JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '10000s' },
      }),MailerModule,ConfigModule.forRoot()
    ],
    providers: [UsersService, AuthService,MailerService,JwtStrategy],
    controllers: [UsersController, AuthController,],
  })
  export class UsersModule {}


  