import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Heet API Document')
    .setDescription('Heet swagger..')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        description: 'Enter token',
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
