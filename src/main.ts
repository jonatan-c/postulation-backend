/* eslint-disable @typescript-eslint/no-floating-promises */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';

import { initSwagger } from './app.swagger';

async function bootstrap(): Promise<any> {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger();
	const port = process.env.PORT || 3000;
	// AWS conextion
	config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
	});

	// cors
	app.enableCors();

	// Swagger
	initSwagger(app);

	// required to class validator
	app.useGlobalPipes(
		new ValidationPipe({
			forbidUnknownValues: false,
			transform: true,
		})
	);
	await app.listen(port);
	logger.log(`Server is running in http://localhost:${port}`);
	logger.log(
		`Documentation is running in http://localhost:${port}/v1/api-docs`
	);
}
bootstrap();
