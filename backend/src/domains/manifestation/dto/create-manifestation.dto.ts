import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateManifestationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
