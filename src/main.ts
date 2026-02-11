import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('GD Home API')
    .setDescription('GD Home API description')
    .setVersion('1.0')
    .addTag('GD Home')
    .addBearerAuth({
      type: 'http',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
