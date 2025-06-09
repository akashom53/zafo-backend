import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000, // 60 seconds timeout
      maxRedirects: 2,
    })
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule { }