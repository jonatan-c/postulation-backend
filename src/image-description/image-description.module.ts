import { Module } from '@nestjs/common';
import { ImageDescriptionService } from './image-description.service';
import { ImageDescriptionController } from './image-description.controller';
import { ImageDescription } from './entities/image-description.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostulationModule } from 'src/postulation/postulation.module';

@Module({
	imports: [TypeOrmModule.forFeature([ImageDescription]), PostulationModule],
	controllers: [ImageDescriptionController],
	providers: [ImageDescriptionService],
	// exports: [ImageDescriptionService]
})
export class ImageDescriptionModule {}
