import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express'
import { User } from 'src/users/entities/user.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @UseGuards(JwtGuard)
  create(@Req() req: Request, @Body() createQuestionDto: CreateQuestionDto) {
    const user = req.user as User
    return this.questionsService.create(createQuestionDto, user);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Req() req: Request,) {
    return this.questionsService.findAll(req.user as User);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Req() req: Request, @Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto, req.user as User);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
