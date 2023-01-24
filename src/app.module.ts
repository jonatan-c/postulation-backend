/* eslint-disable n/no-path-concat */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './database/database.module';

import { ImageDescriptionModule } from './image-description/image-description.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostulationModule } from './postulation/postulation.module';
import { AppLoggerMiddleware } from './Logger';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST || 'localhost',
			port: 5499,
			username: process.env.DATABASE_USER || 'postgres',
			password: process.env.DATABASE_PASSWORD || 'postgres',
			database: process.env.DATABASE_NAME || 'postgres',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),

		PostulationModule,

		ImageDescriptionModule,

		AuthModule,

		UserModule,
	],
	controllers: [
		AppController,
		// ,PostulationController,ImageDescriptionService
	],
	providers: [
		AppService,
		// ,PostulationService,ImageDescriptionService
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AppLoggerMiddleware).forRoutes('*');
	}
}
