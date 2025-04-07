import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://zafouser:zafopassword@zafo.mwice.mongodb.net/?retryWrites=true&w=majority&appName=zafo'), UsersModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
