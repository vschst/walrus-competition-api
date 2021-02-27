import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GetRaceDataDTO } from '@models/races/dto/race.dto';
import { GetRelayDataDTO } from '@models/relays/dto/relay.dto';
import { GetCryatlonDataDTO } from '@models/cryatlons/dto/cryatlon.dto';
import { Serializable } from '@common/serializers/base.serializer';

export class GetCompetitionDataDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsDate()
  end_date: Date;

  @ApiProperty({ type: [GetRaceDataDTO] })
  @IsArray()
  @Type(() => GetRaceDataDTO)
  races: GetRaceDataDTO[];

  @ApiProperty({ type: [GetRelayDataDTO] })
  @IsArray()
  @Type(() => GetRelayDataDTO)
  relays: GetRelayDataDTO[];

  @ApiProperty({ type: [GetCryatlonDataDTO] })
  @IsArray()
  @Type(() => GetCryatlonDataDTO)
  cryatlons: GetCryatlonDataDTO[];
}

export class GetCompetitionResponseDTO {
  @ApiProperty({ type: () => GetCompetitionDataDTO })
  data: Serializable<GetCompetitionDataDTO>;
}
