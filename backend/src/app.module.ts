import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiClientModule } from './infrastructure/ai-client/ai-client.module';
import { ManifestationModule } from './domains/manifestation/manifestation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AiClientModule,
    ManifestationModule,
  ],
})
export class AppModule {}
