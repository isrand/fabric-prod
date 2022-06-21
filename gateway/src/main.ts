import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('port');
  const doc = new DocumentBuilder()
    .setTitle('NodeJS Hyperledger Fabric Gateway')
    .setDescription(
      'A REST API microservice to perform invoke / query operations on a Hyperledger Fabric network',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(port);
  Logger.log(`Application available on http://localhost:${port}`);
}

bootstrap();