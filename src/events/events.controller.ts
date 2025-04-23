import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express'
import { User } from 'src/users/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @UseGuards(JwtGuard)
  create(@Req() req: Request, @Body() createEventDto: CreateEventDto) {
    const user = req.user as User
    return this.eventsService.create(createEventDto, user);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Req() req: Request) {
    return this.eventsService.findAll(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
