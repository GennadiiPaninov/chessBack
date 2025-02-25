import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  console.log('Starting NestJS application...');
  await app.init();
  console.log('NestJS application initialized');
  return server;
}

// Экспорт для Vercel
export default async (req, res) => {
  const handler = await bootstrap();
  handler(req, res);
};