import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDescriptionDto {
	@ApiProperty()
	fileName?: string;

	@ApiProperty()
	descriptionFile?: string;

	@ApiProperty()
	fileUrl?: string;

	@ApiProperty()
	key?: string;

	@ApiProperty()
	postulationId?: number;
}
