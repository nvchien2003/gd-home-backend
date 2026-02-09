import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostDto } from "./post.dto";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getAllPosts() {
        return this.postsService.findAll();
    }

    @Post()
    async create(@Body() data: PostDto) {
        return this.postsService.create(data);
    }
}