import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponseDTO {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: string;
}
