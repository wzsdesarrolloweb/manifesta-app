import { Module } from '@nestjs/common';
import { ManifestationController } from './controllers/manifestation.controller';
import { ManifestationService } from './services/manifestation.service';

@Module({
  controllers: [ManifestationController],
  providers: [ManifestationService],
})
export class ManifestationModule {}
