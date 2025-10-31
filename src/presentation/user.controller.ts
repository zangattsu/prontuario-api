// src/modules/users/presentation/user.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/application/commands/users/create-user.command';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UserDto } from 'src/application/dtos/users/user.dto';
import { UserMapper } from 'src/application/mappers/users/user.mapper';
import { GetUserQuery } from 'src/application/queries/users/get-user.query';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateUserDto): Promise<{ message: string }> {
    try {
      const command = new CreateUserCommand(dto.name, dto.email, dto.age);
      await this.commandBus.execute(command);
      return { message: 'Usuário criado com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserDto> {
    const query = new GetUserQuery(id);
    const user = await this.queryBus.execute(query);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return UserMapper.toDto(user);
  }
}