
import { OmitType } from '@nestjs/mapped-types';
import { ProjectEntity } from '../entities/project.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto extends OmitType(ProjectEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt'
]) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
