import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { CreateUserDto } from '@src/users/dtos/create-user.dto';
import { UserService } from '@src/users/services/user.service';
import { Public } from '@src/auth/decorators/public.decorator';
import { CurrentUser } from '@src/auth/decorators/current-user.decorator';
import { UpdateUserDto } from '@src/users/dtos/update-user.dto';
import { UpdateUserPasswordDto } from '@src/users/dtos/update-user-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: STATUS_CODES[HttpStatus.CREATED] })
  @ApiConflictResponse({ description: STATUS_CODES[HttpStatus.CONFLICT] })
  @ApiBody({
    type: CreateUserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('')
  @ApiOperation({ summary: 'Edit user' })
  @ApiCreatedResponse({ description: STATUS_CODES[HttpStatus.CREATED] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto,
  })
  async updateUser(
    @CurrentUser() user: { userId: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user.userId, updateUserDto);
  }

  @Get('/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find current session user!' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async findCurrentUser(@CurrentUser() user: { userId: string }) {
    return this.userService.userProfile(user.userId);
  }

  @Patch('/password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiCreatedResponse({ description: STATUS_CODES[HttpStatus.CREATED] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserPasswordDto,
  })
  async updateUserPassword(
    @CurrentUser() user: { userId: string },
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.userService.updateUserPassword(
      user.userId,
      updateUserPasswordDto.password,
      updateUserPasswordDto.oldPassword,
    );
  }

  @Get('/:userId')
  @Public()
  @ApiOperation({ summary: 'Find an user by Id' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiBadRequestResponse({ description: STATUS_CODES[HttpStatus.BAD_REQUEST] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async findUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.findUserById(userId);
  }

  @Delete('/:userId')
  @Public()
  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async deleteUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get('/')
  @Public()
  @ApiOperation({ summary: 'Find users' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  async findUsers() {
    return this.userService.findUsers();
  }

  @Post('/favorite/:productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save new favorite product to the current user!' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async addFavoiteProduct(
    @CurrentUser() user: { userId: string },
    @Param('productId') productId: number,
  ) {
    return this.userService.saveProductAsFavorite(user.userId, productId);
  }

  @Delete('/favorite/:productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save new favorite product to the current user!' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async removeFavoiteProduct(
    @CurrentUser() user: { userId: string },
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ) {
    return this.userService.removeProductAsFavorite(user.userId, productId);
  }
}
