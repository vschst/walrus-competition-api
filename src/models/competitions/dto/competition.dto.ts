import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { GetRaceDataDTO } from '@models/races/dto/race.dto';
import { GetRelayDataDTO } from '@models/relays/dto/relay.dto';
import { GetCryathlonDataDTO } from '@models/cryatlons/dto/cryathlon.dto';
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
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsDate()
  end_date: Date;

  @ApiProperty()
  @IsArray()
  @Type(() => GetRaceDataDTO)
  races: GetRaceDataDTO[];

  @ApiProperty()
  @IsArray()
  @Type(() => GetRelayDataDTO)
  relays: GetRelayDataDTO[];

  @ApiProperty()
  @IsArray()
  @Type(() => GetCryathlonDataDTO)
  cryathlons: GetCryathlonDataDTO[];
}

export class GetCompetitionResponseDTO {
  @ApiProperty({ type: () => GetCompetitionDataDTO })
  data: Serializable<GetCompetitionDataDTO>;
}
