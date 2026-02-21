import api from '../../../common/config/api';
import type { CreateManifestationDto, Manifestation } from '../types/manifestation.types';

export const manifestationService = {
  async create(dto: CreateManifestationDto): Promise<Manifestation> {
    const { data } = await api.post<Manifestation>('/manifestations', dto);
    return data;
  },
};
