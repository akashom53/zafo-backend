import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {

  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) { }

  create(createEventDto: CreateEventDto) {
    const created = new this.eventModel({ ...createEventDto, createdAt: Date.now() })
    return created.save()
  }

  findAll() {
    return this.eventModel.find()
  }

  findOne(id: number) {
    return this.eventModel.findById(id)
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto)

  }

  remove(id: number) {
    return this.eventModel.findByIdAndDelete(id)
  }
}
