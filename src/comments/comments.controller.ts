import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    const post = await this.postsService.findOne(+postId);
    const user = await this.usersService.findOne(req.user.username);
    return this.commentsService.create(createCommentDto, user, post);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(+postId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async remove() {

  }
}
