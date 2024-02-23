import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailerService } from './mailer.service';

import { SendEmailDto } from './mail.interface';
import { Subject } from 'rxjs';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
@Post('/sendmail')
  async sendMail(){
    const dto :SendEmailDto={
      from:{name:'ahmed trabelsi',address:'hmayda123trabelsi@gmail.com'},
      recipients:[{name:'ahmed trabelsi',address:'trabelsi.ahmed.1@esprit.tn'}],
      subject:'lucky ',
      html:'<p>hi mohsen</p>',
    }
    return await this.mailerService.sendEmail(dto);
  }
}
