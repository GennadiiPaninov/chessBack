import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
const express = require('express'); // Заменяем import на require

console.log('Initializing Express server...');
const server = express();

async function bootstrap() {
  console.log('Starting bootstrap...');
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    console.log('NestJS app created');
    await app.init();
    console.log('NestJS app initialized');
    return server;
  } catch (error) {
    console.error('Error in bootstrap:', error);
    throw error;
  }
}

export default async (req, res) => {
  console.log('Handling request:', req.method, req.url);
  try {
    const handler = await bootstrap();
    console.log('Handler created');
    handler(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
};