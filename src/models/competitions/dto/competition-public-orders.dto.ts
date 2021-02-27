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
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { GetPublicRaceListItemDTO } from '@models/races/dto/public-races.dto';
import { GetPublicRelayListItemDTO } from '@models/relays/dto/public-relays.dto';
import { GetPublicCryatlonListItemDTO } from '@models/cryatlons/dto/public-cryatlons.dto';
import { Serializable } from '@common/serializers/base.serializer';

export class GetCompetitionPublicOrdersDataDTO {
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

  @ApiProperty({ type: [GetPublicOrderListItemDTO] })
  @Expose()
  @IsArray()
  @Type(() => GetPublicOrderListItemDTO)
  orders: GetPublicOrderListItemDTO[];

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
