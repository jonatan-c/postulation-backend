import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication): any => {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Postulations')
		.addBearerAuth()
		.setDescription('ERP to admin postulations')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('/v1/api-docs', app, document);
};
