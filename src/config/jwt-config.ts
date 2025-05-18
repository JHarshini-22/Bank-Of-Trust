import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'supersecret',
  expiresIn: process.env.JWT_EXPIRATION || '1d',
}));
