import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  debug: process.env.MAIL_DEBUG,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  from: process.env.MAIL_FROM,
  notifyEmail: process.env.MAIL_NOTIFY_EMAIL
}));