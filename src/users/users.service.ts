import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel(createUserDto)
    return created.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find()
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findById(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto)
  }

  async remove(id: number): Promise<Boolean | null> {
    return this.userModel.findByIdAndDelete(id)
  }
}
