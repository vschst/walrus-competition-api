import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, LessThan, MoreThan } from 'typeorm';
import { MemberView } from './entities/member-view.entity';
import { ClubService } from '@models/clubs/club.service';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    private readonly clubService: ClubService,
    @InjectRepository(MemberView)
    private membersRepository: Repository<MemberView>,
  ) {}

  async findOne(id: number): Promise<[boolean, MemberView]> {
    const member = await this.membersRepository.findOne({ id });

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
    gender = null,
    min_age = null,
    max_age = null,
    search = null,
  ): Promise<[MemberView[], number]> {
    return await this.membersRepository.findAndCount({
      ...(limit >= 0 && { take: limit }),
      skip: offset,
      order: {
        [sort]: direction.toUpperCase(),
      },
      where: {
        ...(club_id && { club_id }),
        ...(gender && { gender }),
        ...(min_age && {
          age: MoreThan(min_age),
        }),
        ...(max_age && {
          age: LessThan(max_age),
        }),
        ...(search && {
          last_name: ILike(`%${search}%`),
        }),
      },
    });
  }
}
