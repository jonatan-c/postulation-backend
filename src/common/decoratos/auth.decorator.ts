import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(): any {
	return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}
