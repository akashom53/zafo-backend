import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with custom options
  app.enableCors({
    origin: ['http://localhost:4200', 'https://akkipedia.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Zafo API")
    .setDescription("OpenAPI swagger doc for Zafo API")
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('apidoc', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
