import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class QuestionsService {

  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) { }

  create(createQuestionDto: CreateQuestionDto, user: User) {
    const createData = { ...createQuestionDto, user }
    const created = new this.questionModel(createData)
    return created.save()
  }


  findAll(user: User) {
    return this.questionModel.find()
  }

  findOne(id: number) {
    return this.questionModel.findById(id)
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto, user: User) {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto)

  }

  remove(id: number) {
    return this.questionModel.findByIdAndDelete(id)
  }
}
