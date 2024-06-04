export class ErrorResponseDto {
    success: boolean;
    message: string;
    data: null;
    error?: Error | string;
}
