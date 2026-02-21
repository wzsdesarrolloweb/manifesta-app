import { useMutation } from '@tanstack/react-query';
import { manifestationService } from '../services/manifestation.service';
import type { CreateManifestationDto } from '../types/manifestation.types';

export function useCreateManifestation() {
  return useMutation({
    mutationFn: (dto: CreateManifestationDto) => manifestationService.create(dto),
  });
}
