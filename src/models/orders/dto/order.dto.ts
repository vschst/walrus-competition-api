import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Gender } from '@common/enums/gender.enum';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';
import { Type } from 'class-transformer';
import { GetRaceDataDTO } from '@models/races/dto/race.dto';
import { GetRelayDataDTO } from '@models/relays/dto/relay.dto';
import { GetCryatlonDataDTO } from '@models/cryatlons/dto/cryatlon.dto';
import { Serializable } from '@common/serializers/base.serializer';

export class GetOrderDataDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  competition_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competition_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @IsDate()
  birthdate: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsBoolean()
  para_swimmer: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  club_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  need_skis: boolean;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  additional: string;

  @ApiProperty()
  @IsEnum(OrderStatuses)
  status: OrderStatuses;

  @ApiProperty()
  @IsDate()
  created_at: Date;

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

export class GetOrderResponseDTO {
  @ApiProperty({ type: () => GetOrderDataDTO })
  data: Serializable<GetOrderDataDTO>;
}
