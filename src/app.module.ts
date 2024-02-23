import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from './mailer/mailer.module';
import { UsersModule } from './users/users.module';
import { EntrepriseModule } from './entreprise/entreprise.module';




@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/nestdb'), UsersModule, EntrepriseModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
