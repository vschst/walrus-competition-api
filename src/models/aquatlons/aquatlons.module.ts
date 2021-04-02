import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aquatlon } from './entities/aquatlon.entity';
import { PublicAquatlonsSerializerService } from './serializers/public-aquatlons.serializer';
import { PublicAquatlonsService } from './public-aquatlons.service';
import { AquatlonsController } from './aquatlons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aquatlon])],
  providers: [PublicAquatlonsSerializerService, PublicAquatlonsService],
  controllers: [AquatlonsController],
})
export class AquatlonsModule {}
