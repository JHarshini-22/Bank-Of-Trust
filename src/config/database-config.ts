import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    url: process.env.DATABASE_URL,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bankoftrust',
  },
}));
