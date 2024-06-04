import { HttpException } from "@nestjs/common";

export function successResponse(message: string = '', data: any = [], meta: any = null) {
    return {
        success: true,
        data,
        meta,
        message,
    };
}

export function errorResponse(message: string = '', error?: any) {
    return {
        success: false,
        message,
        error,
    };
}

export function errorResponseCode(message: string = '', code?: any) {
    throw new HttpException({
        success: false,
        message: message,
    }, code);
}

export class SuccessResponseDto {
    success: boolean;
    data: any;
    meta: any;
    message: string
}

export class ErrorResponseDto {
    success: boolean;
    message: string;
    error?: Error | string
}


export type PromiseResponse = Promise<ErrorResponseDto | SuccessResponseDto>;
