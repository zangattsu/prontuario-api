// src/config/redis.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  password: process.env.REDIS_PASSWORD,
}));
