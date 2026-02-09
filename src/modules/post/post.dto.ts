import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    authorId: string;

}