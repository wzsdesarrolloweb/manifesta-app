export interface Manifestation {
  title: string;
  description: string;
  affirmations: string[];
  suggestedActions: string[];
  createdAt: string;
}

export interface CreateManifestationDto {
  title: string;
  description: string;
}
