import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalPipes(   //validationPipe is used to validate the incoming request data based on the DTOs defined in the application.
  new ValidationPipe({
    whitelist: true, //for removing any properties that are not defined in the DTOs from the incoming request data.
  }),
);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
