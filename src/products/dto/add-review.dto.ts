import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsPositive, ArrayNotEmpty, Min, Max } from 'class-validator';

export class AddReviewDto {

    @IsString()
    username: string;


    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    comment: string;    
}