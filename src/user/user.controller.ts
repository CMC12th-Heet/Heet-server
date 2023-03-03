import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './user.decorator';

enum CityEnum {
  gyeonggi = 'gyeonggi',
  seoul = 'seoul',
  incheon = 'incheon',
}

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email-verify')
  @ApiOperation({
    summary: '이메일 인증 API',
    description: '이메일을 인증한다',
  })
  @ApiBody({ description: '이메일 주소', type: VerifyEmailDto })
  emailVerify(@Body() verifyUserDto: VerifyEmailDto) {
    return this.userService.emailVerify(verifyUserDto);
  }

  @Post('/find-duplicate')
  @ApiOperation({ summary: '아이디 중복확인 API', description: '중복확인' })
  @ApiQuery({ description: '입력한 아이디', name: 'username' })
  findDuplicateUsername(@Query('username') username: string) {
    return this.userService.findDuplicateUsername(username);
  }

  @Post()
  @ApiOperation({ summary: '회원가입 API', description: '유저를 생성한다.' })
  @ApiBody({ description: '회원가입용 정보', type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: '(TOKEN GET) 로그인 API',
    description: '로그인한다.',
  })
  @ApiBody({ description: '이메일 주소, 비밀번호', type: LoginUserDto })
  verify(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('/city')
  @ApiOperation({
    summary: '내 동네 선택 API',
    description: '지역에 따른 00구 정보를 가져온다',
  })
  @ApiQuery({ description: '지역구', name: 'name', enum: CityEnum })
  showCity(@Query('name') name: string) {
    return this.userService.showCity(name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/my-page')
  @ApiOperation({
    summary: '마이페이지 조회 API',
    description: '마이페이지 들어가자마자 나오는 화면',
  })
  @ApiBody({ description: '회원가입용 정보', type: CreateUserDto })
  viewMyPage(@GetUser() getUser) {
    return this.userService.viewMyPage(getUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/my-page')
  @ApiOperation({
    summary: '마이페이지 수정 API',
    description: '마이페이지 수정하기',
  })
  @ApiBody({ description: '회원가입용 정보', type: CreateUserDto })
  editMyPage(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
