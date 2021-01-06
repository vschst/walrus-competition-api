import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Member } from './member.entity';
import { Club } from '@models/clubs/entities/club.entity';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Gender } from '@common/enums/gender.enum';

@ViewEntity({
  name: 'members_view',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('member.id', 'id')
      .addSelect('member.last_name', 'last_name')
      .addSelect('member.first_name', 'first_name')
      .addSelect('member.middle_name', 'middle_name')
      .addSelect('member.birthdate', 'birthdate')
      .addSelect('member.gender', 'gender')
      .addSelect('member.club_id', 'club_id')
      .addSelect('club.name', 'club_name')
      .addSelect('member.email', 'email')
      .addSelect('member.phone', 'phone')
      .from(Member, 'member')
      .innerJoin(Club, 'club', 'club.id = member.club_id'),
})
export class MemberView {
  @IsInt()
  @ViewColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  first_name: string;

  @IsString()
  @IsOptional()
  @ViewColumn()
  middle_name: string;

  @IsDate()
  @ViewColumn()
  birthdate: Date;

  @IsEnum(Gender)
  @ViewColumn()
  gender: Gender;

  @IsInt()
  @ViewColumn()
  club_id: number;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  club_name: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  @ViewColumn()
  email: string;

  @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  @ViewColumn()
  phone: string;
}
