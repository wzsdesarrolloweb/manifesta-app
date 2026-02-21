import { Body, Controller, Post } from '@nestjs/common';
import { ManifestationService } from '../services/manifestation.service';
import { CreateManifestationDto } from '../dto/create-manifestation.dto';

@Controller('manifestations')
export class ManifestationController {
  constructor(private service: ManifestationService) {}

  @Post()
  create(@Body() dto: CreateManifestationDto) {
    return this.service.create(dto);
  }
}
