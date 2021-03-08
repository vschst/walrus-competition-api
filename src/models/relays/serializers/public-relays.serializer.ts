import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Relay } from '@models/relays/entities/relay.entity';
import { GetPublicRelayListItemDTO } from '../dto/public-relays.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PublicRelaysSerializerService extends BaseSerializerService<
  Relay,
  GetPublicRelayListItemDTO
> {
  public async serialize(relay: Relay): Promise<GetPublicRelayListItemDTO> {
    return plainToClass(GetPublicRelayListItemDTO, relay, {
      excludeExtraneousValues: true,
    });
  }
}
