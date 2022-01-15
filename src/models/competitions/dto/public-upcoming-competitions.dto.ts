import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';

export class GetPublicUpcomingCompetitionListItemDTO {
  @ApiProperty()
  @Expose()
  @IsInt()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  end_date: Date;
}

export class GetPublicUpcomingCompetitionsListResponseDTO {
  @ApiProperty({ type: () => [GetPublicUpcomingCompetitionListItemDTO] })
  data: Serializable<GetPublicUpcomingCompetitionListItemDTO[]>;
}
