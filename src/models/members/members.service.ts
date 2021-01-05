import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberView } from './entities/member-view.entity';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(MemberView)
    private memberViewEntity: Repository<MemberView>,
  ) {}

  async findOne(id: number): Promise<[boolean, Member]> {
    const member = await this.memberRepository.findOne(id);

    if (!member) {
      return [false, null];
    }

    return [true, member];
  }

  async findAll(
    limit = 10,
    offset = 0,
    sort = 'first_name',
    direction = 'desc',
    club_id = null,
    search = '',
  ): Promise<[MemberView[], number]> {
    return await this.memberViewEntity.findAndCount({
      ...(limit >= 0 && { take: limit }),
      skip: offset,
      order: {
        [sort]: direction.toUpperCase(),
      },
      where: {
        ...(club_id && { club_id }),
      },
      ...(search && {
        first_name: Like(`%${search}%`),
      }),
    });
  }
}
