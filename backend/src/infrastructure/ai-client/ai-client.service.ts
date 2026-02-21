import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface ManifestationAIResult {
  affirmations: string[];
  suggestedActions: string[];
}

@Injectable()
export class AiClientService {
  private openai: OpenAI;

  constructor(private config: ConfigService) {
    this.openai = new OpenAI({ apiKey: this.config.get<string>('OPENAI_API_KEY') });
  }

  async generateManifestation(title: string, description: string): Promise<ManifestationAIResult> {
    const prompt = `Eres un guía espiritual experto en ley de atracción, reiki, yoga y energía cuántica.
El usuario quiere manifestar: "${title}".
Descripción: "${description}".

Genera EXACTAMENTE:
- 5 afirmaciones de poder en primera persona, presentes, positivas, resonantes y energéticamente potentes.
- 3 acciones concretas y holísticas (meditación, visualización, respiracion) que apoyen esta manifestación, se especifico y concreto en como es la acción.

Responde SOLO en JSON con esta estructura:
{
  "affirmations": ["...", "...", "...", "...", "..."],
  "suggestedActions": ["...", "...", "...", "...", "..."]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.85,
    });

    const content = response.choices[0].message.content ?? '{}';
    const parsed = JSON.parse(content) as ManifestationAIResult;
    return parsed;
  }
}
