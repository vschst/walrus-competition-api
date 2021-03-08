import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cryatlon } from './entities/cryatlon.entity';
import { PublicCryatlonsSerializerService } from './serializers/public-cryatlons.serializer';
import { PublicCryatlonsService } from './public-cryatlons.service';
import { CryatlonsController } from './cryatlons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cryatlon])],
  providers: [PublicCryatlonsSerializerService, PublicCryatlonsService],
  controllers: [CryatlonsController],
})
export class CryatlonsModule {}
