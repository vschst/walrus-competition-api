import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';

export class GetClubsListItem {
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
  @IsInt()
  members_count: number;
}

export class GetClubsListResponseDTO {
  @ApiProperty({ type: () => [GetClubsListItem] })
  data: Serializable<GetClubsListItem[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
