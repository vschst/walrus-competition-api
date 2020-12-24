import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Club } from './club.entity';
import { Member } from '@models/members/entities/member.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@ViewEntity({
  name: 'clubs_view',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('club.id', 'id')
      .addSelect('club.name', 'name')
      .addSelect('club.location', 'location')
      .addSelect('count(member.id)', 'members_count')
      .from(Club, 'club')
      .leftJoin(Member, 'member', 'member.club_id = club.id')
      .groupBy('club.id'),
})
export class ClubView {
  @IsInt()
  @ViewColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  location: string;

  @IsInt()
  @ViewColumn()
  members_count: number;

  constructor(clubView: Partial<ClubView>) {
    Object.assign(this, clubView);
  }
}
