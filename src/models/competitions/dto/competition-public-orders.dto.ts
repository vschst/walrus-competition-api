import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { GetPublicRaceListItemDTO } from '@models/races/dto/public-races.dto';
import { GetPublicRelayListItemDTO } from '@models/relays/dto/public-relays.dto';
import { GetPublicCryatlonListItemDTO } from '@models/cryatlons/dto/public-cryatlons.dto';
import { Serializable } from '@common/serializers/base.serializer';
import { GetCompetitionDataDTO } from './competition.dto';

export class GetCompetitionPublicOrdersDataDTO extends GetCompetitionDataDTO {
  @ApiProperty({ type: [GetPublicRaceListItemDTO] })
  @Expose()
  @IsArray()
  @Type(() => GetPublicRaceListItemDTO)
  races: GetPublicRaceListItemDTO[];

  @ApiProperty({ type: [GetPublicRelayListItemDTO] })
  @Expose()
  @IsArray()
  @Type(() => GetPublicRelayListItemDTO)
  relays: GetPublicRelayListItemDTO[];

  @ApiProperty({ type: [GetPublicCryatlonListItemDTO] })
  @Expose()
  @IsArray()
  @Type(() => GetPublicCryatlonListItemDTO)
  cryatlons: GetPublicCryatlonListItemDTO[];
}

export class GetCompetitionPublicOrdersResponseDTO {
  @ApiProperty({ type: () => GetCompetitionPublicOrdersDataDTO })
  data: Serializable<GetCompetitionPublicOrdersDataDTO>;
}
