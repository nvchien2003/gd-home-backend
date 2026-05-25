import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform-interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
      transform: true,
    }),
  );

  //intercept
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
