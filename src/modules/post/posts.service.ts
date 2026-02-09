import { Injectable } from "@nestjs/common";
import { In } from "typeorm";
import { Post, PostDocument } from "./post.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel : Model<PostDocument>,
    ) {}

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    async create(data: Partial<Post>): Promise<Post> {
        const createPost = new this.postModel(data);
        return createPost.save();
    }
}