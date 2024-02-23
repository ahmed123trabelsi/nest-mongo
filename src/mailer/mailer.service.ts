import { Injectable } from '@nestjs/common';

import* as nodemailer from 'nodemailer'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer';
@Injectable()
export class MailerService {
  constructor(private readonly configservice:ConfigService){}
  mailTransport(){
    const transporter=nodemailer.createTransport({
      host: this.configservice.get<string>('MAIL_HOST'),
      port: this.configservice.get<number>('MAIL_PORT'),
      secure: true, // use TLS
      auth: {
        user: this.configservice.get<string>('MAIL_USER'),
        pass: this.configservice.get<string>('MAIL_PASSWORD'),
      },
    })
    return transporter;
  }
  async sendEmail(dto:SendEmailDto){
    const{from,recipients,subject,html,placeholderReplacements}=dto
    const options:Mail.Options={
      from: from ??{
        name:this.configservice.get<string>('APP_NAME'),
        address:this.configservice.get<string>('DEFAULT_MAIL_FROM'),
      },
      to:recipients,
      subject,
      html

    }
    const transport=this.mailTransport();
    try{
      const result= await transport.sendMail(options)
      return result
    }catch(error){
      console.log('error :',error)
    }
  }

}
