import { Module } from '@nestjs/common';
import { PostulationService } from './postulation.service';
import { PostulationController } from './postulation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PostulationRepository } from './postulation.repository';
import { Postulation } from './entities/postulation.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Postulation])],
	controllers: [PostulationController],
	providers: [PostulationService],
	exports: [PostulationService],
	// exports: [PostulationService]
})
export class PostulationModule {}
