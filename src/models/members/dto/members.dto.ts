import { ApiProperty } from '@nestjs/swagger';
import { Serializable } from '@common/serializers/base.serializer';
import {
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
import { Expose } from 'class-transformer';

export class GetMemberListItemDTO {
  @ApiProperty()
  @Expose()
  @IsInt()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  birthdate: Date;

  @ApiProperty({ enum: Gender })
  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  para_swimmer: boolean;

  @ApiProperty()
  @Expose()
  @IsInt()
  club_id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  club_name: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @Expose()
  @IsPhoneNumber('RU')
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  location: string;
}

export class GetMembersListResponseDTO {
  @ApiProperty({ type: () => [GetMemberListItemDTO] })
  data: Serializable<GetMemberListItemDTO[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
