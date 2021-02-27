import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cryatlon } from './entities/cryatlon.entity';
import { PublicCryatlonsSerializerService } from './serializers/public-cryatlons.serializer';
import { CryatlonsService } from './cryatlons.service';
import { CryatlonsController } from './cryatlons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cryatlon])],
  providers: [PublicCryatlonsSerializerService, CryatlonsService],
  controllers: [CryatlonsController],
})
export class CryatlonsModule {}
