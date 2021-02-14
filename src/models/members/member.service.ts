import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { ClubService } from '@models/clubs/club.service';
import { Gender } from '@common/enums/gender.enum';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);

  constructor(
    private readonly clubService: ClubService,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
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
      const [isClubExists, club] = await this.clubService.findOne(club_id);

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
    const member = await this.memberRepository.findOne(id);

    if (!member) {
      return [false, null];
    }

    return [true, member];
  }
}
