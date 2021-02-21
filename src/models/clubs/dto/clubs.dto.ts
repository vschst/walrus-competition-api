import { ApiProperty } from '@nestjs/swagger';
import { Serializable } from '@common/serializers/base.serializer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetClubsListItemDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @Transform(({ value: count }) => parseInt(count))
  @IsInt()
  members_count: number;
}

export class GetClubsListResponseDTO {
  @ApiProperty({ type: () => [GetClubsListItemDTO] })
  data: Serializable<GetClubsListItemDTO[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
