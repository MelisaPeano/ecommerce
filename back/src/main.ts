import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Filters/http-exception.filter';
import { CategoriesSeed } from './seeder/categoriesSeed';
import { auth } from 'express-openid-connect';
import { config } from './config/auth0.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserSeed } from './seeder/userSeeder';
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
  const userSeed = app.get(UserSeed);
  await userSeed.seed();
  console.log('User seeding completed');
  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();;
  console.log('pre-seeding completed');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .addBearerAuth()
    .setDescription('Ecommerce API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000,'0.0.0.0');
}
bootstrap();
