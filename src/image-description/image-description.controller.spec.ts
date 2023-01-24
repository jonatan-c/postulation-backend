import { Test, TestingModule } from '@nestjs/testing';
import { ImageDescriptionController } from './image-description.controller';
import { ImageDescriptionService } from './image-description.service';

describe('ImageDescriptionController', () => {
	let controller: ImageDescriptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ImageDescriptionController],
			providers: [ImageDescriptionService],
		}).compile();

		controller = module.get<ImageDescriptionController>(
			ImageDescriptionController
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
