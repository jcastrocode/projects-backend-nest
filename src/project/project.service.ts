import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProjectDto: CreateProjectDto) {
    return await this.prismaService.project.create({
      data: createProjectDto,
    });
  }

  async findAll() {
    return await this.prismaService.project.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.project.findUniqueOrThrow({ where: { id } });

  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.prismaService.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.project.delete({ where: { id } });
  }

}
