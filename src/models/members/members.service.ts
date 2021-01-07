import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberView } from './entities/member-view.entity';
import { Gender } from '@common/enums/gender.enum';
import { ClubsService } from '@models/clubs/clubs.service';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    private readonly clubsService: ClubsService,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(MemberView)
    private memberViewEntity: Repository<MemberView>,
  ) {}

  async createMember(
    first_name: string,
    last_name: string,
    middle_name: string | null,
    birthdate: Date,
    gender: Gender,
    club_id: number,
    email: string,
    phone: string,
  ): Promise<[boolean, Member]> {
    try {
      const [isClubExists, club] = await this.clubsService.findOne(club_id);

      if (isClubExists) {
        const member = new Member({
          first_name,
          last_name,
          middle_name,
          birthdate,
          gender,
          email,
          phone,
          club,
        });

        await member.save();

        return [true, member];
      } else {
        this.logger.error(`Club with id = ${club_id} not found`);

        return [false, null];
      }
    } catch (error) {
      this.logger.error(error);

      return [false, null];
    }
  }

  async findOne(id: number): Promise<[boolean, Member]> {
    const member = await this.memberRepository.findOne(id, {
      relations: ['club'],
    });

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
        ...(gender && { gender }),
      },
      ...(search && {
        first_name: Like(`%${search}%`),
      }),
    });
  }
}
