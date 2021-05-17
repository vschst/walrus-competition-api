import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { GetRaceDataDTO } from '@models/races/dto/race.dto';
import { GetRelayDataDTO } from '@models/relays/dto/relay.dto';
import { GetCryatlonDataDTO } from '@models/cryatlons/dto/cryatlon.dto';
import { GetAquatlonDataDTO } from '@models/aquatlons/dto/aquatlon.dto';
import { Serializable } from '@common/serializers/base.serializer';

export class GetCompetitionDataDTO {
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

  @ApiProperty({ type: [GetAquatlonDataDTO] })
  @IsArray()
  @Type(() => GetAquatlonDataDTO)
  aquatlons: GetAquatlonDataDTO[];
}

export class GetCompetitionResponseDTO {
  @ApiProperty({ type: () => GetCompetitionDataDTO })
  data: Serializable<GetCompetitionDataDTO>;
}
