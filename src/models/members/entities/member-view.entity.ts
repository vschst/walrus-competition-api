import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Member } from './member.entity';
import { Club } from '@models/clubs/entities/club.entity';
import {
  IsBoolean,
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
      .addSelect('EXTRACT(YEAR FROM AGE(member.birthdate))', 'age')
      .addSelect('member.gender', 'gender')
      .addSelect('member.para_swimmer', 'para_swimmer')
      .addSelect('member.club_id', 'club_id')
      .addSelect('club.name', 'club_name')
      .addSelect('member.email', 'email')
      .addSelect('member.phone', 'phone')
      .addSelect('member.location', 'location')
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

  @IsInt()
  @ViewColumn()
  age: number;

  @IsEnum(Gender)
  @ViewColumn()
  gender: Gender;

  @IsBoolean()
  @ViewColumn()
  para_swimmer: boolean;

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

  @IsOptional()
  @IsString()
  @ViewColumn()
  location: string;

  @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  @ViewColumn()
  phone: string;
}
