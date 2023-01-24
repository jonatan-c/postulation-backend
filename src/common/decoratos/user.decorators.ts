/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();

		const user = request.user;

		const { password, ...result } = user;

		return data ? result && result[data] : result;
	}
);
