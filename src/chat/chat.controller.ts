import { Controller, Get, Query, BadRequestException, UseGuards, Req, HttpException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AxiosError } from 'axios';

@Controller('chat')
@UseGuards(JwtGuard) // Apply JwtGuard to all routes in this controller
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('send')
    async send(@Query('query') query: string, @Req() req: Request) {
        if (!query) {
            throw new BadRequestException('Query parameter is required');
        }

        // You can access the authenticated user if needed
        const user = req.user as User;

        try {
            return await this.chatService.send(query);
        } catch (error) {
            // Check if this is an AxiosError (from the external API)
            if (error instanceof AxiosError && error.response) {
                // Extract the error message and status from the external API
                const status = error.response.status;
                const errorMessage = error.response.data?.message || 
                                    error.response.data?.error || 
                                    'External service error';
                
                // Throw an HttpException with the same status and message
                throw new HttpException(errorMessage, status);
            }
            
            // For other types of errors, re-throw them
            throw error;
        }
    }
}
