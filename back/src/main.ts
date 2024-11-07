import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Filters/http-exception.filter';
import { CategoriesSeed } from './seeder/categoriesSeed';
import { auth } from 'express-openid-connect';
import { config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
  app.use(auth(config));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.enableShutdownHooks();
  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('pre-seeding completed');
  await app.listen(3000);
}
bootstrap();
