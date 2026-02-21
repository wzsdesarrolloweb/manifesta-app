import { Injectable } from '@nestjs/common';
import { AiClientService } from '../../../infrastructure/ai-client/ai-client.service';
import { CreateManifestationDto } from '../dto/create-manifestation.dto';

export interface ManifestationResult {
  title: string;
  description: string;
  affirmations: string[];
  suggestedActions: string[];
  createdAt: string;
}

@Injectable()
export class ManifestationService {
  constructor(private ai: AiClientService) {}

  async create(dto: CreateManifestationDto): Promise<ManifestationResult> {
    const aiResult = await this.ai.generateManifestation(dto.title, dto.description);

    return {
      title: dto.title,
      description: dto.description,
      affirmations: aiResult.affirmations,
      suggestedActions: aiResult.suggestedActions,
      createdAt: new Date().toISOString(),
    };
  }
}
