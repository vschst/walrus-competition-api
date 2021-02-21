import { SetMetadata } from '@nestjs/common';

export const AuthSkip = () => SetMetadata('AUTH_SKIP', true);
