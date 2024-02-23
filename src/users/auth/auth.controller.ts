import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { SendInvitationDto } from 'src/mailer/sendInvitation.dto';
import { JwtAuthGuard } from './jwtAuth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private jwtService: JwtService,private mailerService:MailerService) {}

  @Post('signup')
  async signUp(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.signUp(username, password);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username, password);
  }
  @Get('token')

  getToken(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    return decoded;
  }
  @Post('send-invitation')
  @UseGuards(JwtAuthGuard) // Apply your JWT Auth Guard to protect this route
  async sendInvitation(@Body() sendInvitationDto: SendInvitationDto, @Req() req: any) {
    // Extract user details from request if needed, for example, to customize the email message
    const user = req.user; // This depends on your JWT strategy setup

    const invitationEmail = {
      from: { name: 'ahmed trabelsi', address: 'hmayda123trabelsi@gmail.com' },
      recipients: [{ name: '', address: sendInvitationDto.email }],
      subject: 'You re Invited!',
      html: `<p>Hello, you've been invited by ${user.username} to join our service. Click <a href="your-invitation-link">here</a> to sign up.</p>`,
    };

    await this.mailerService.sendEmail(invitationEmail);
    return { message: 'Invitation sent successfully.' };
  }
}







