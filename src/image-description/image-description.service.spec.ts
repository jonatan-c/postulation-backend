import { Test, TestingModule } from '@nestjs/testing';
import { ImageDescriptionService } from './image-description.service';

describe('ImageDescriptionService', () => {
	let service: ImageDescriptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ImageDescriptionService],
		}).compile();

		service = module.get<ImageDescriptionService>(ImageDescriptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
