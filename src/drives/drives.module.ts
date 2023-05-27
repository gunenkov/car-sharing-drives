import { TypeOrmModule } from '@nestjs/typeorm';
import { Drive } from './models/drive.model';
import { DrivesService } from './drives.service';
import { DrivesResolver } from './drives.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [DrivesService, DrivesResolver],
  imports: [TypeOrmModule.forFeature([Drive])],
})
export class DrivesModule {}
