import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface ChatResponse {
    response_string: string;
    data_type: 'table' | 'bar_chart' | 'line_chart';
    data: Record<string, any>;
}

@Injectable()
export class ChatService {
    constructor(private readonly httpService: HttpService) { }

    async send(input: string): Promise<ChatResponse> {
        // Check for null or empty input
        if (!input || input.trim() === '') {
            throw new BadRequestException('Input cannot be null or empty');
        }

        // Sanitize input - replace potential injection scripts
        // This is a basic sanitization, consider using a library like DOMPurify for more robust protection
        const sanitizedInput = this.sanitizeInput(input);

        try {
            // Make the POST request to the external API
            const response = await firstValueFrom(
                this.httpService.post('https://zafonlpsql-production.up.railway.app/ask', {
                    question: sanitizedInput,
                    table_name: 'logs'
                })
            );

            // Return the response data
            // Using type assertion to match our expected response format
            return response.data as ChatResponse;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error calling external API:', axiosError.message);
            throw new BadRequestException('Failed to get response from the NLP service');
        }
    }

    private sanitizeInput(input: string): string {
        // Basic sanitization to prevent script injection
        // Replace script tags, event handlers, etc.
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/on\w+='[^']*'/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/eval\(/gi, '')
            .replace(/expression\(/gi, '');
    }
}
