import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

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

  @Post()
  @ApiOperation({ summary: '회원가입 API', description: '유저를 생성한다.' })
  @ApiBody({ description: '이것저것,,', type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/find-duplicate')
  @ApiOperation({ summary: '아이디 중복확인 API', description: '중복확인' })
  @ApiQuery({ description: '입력한 아이디', name: 'username' })
  findDuplicateUsername(@Query('username') username: string) {
    return this.userService.findDuplicateUsername(username);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인 API', description: '로그인한다.' })
  @ApiBody({ description: '이메일 주소, 비밀번호', type: LoginUserDto })
  verify(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('/city')
  @ApiOperation({ summary: '주소지 선택 API', description: '선택한다' })
  @ApiQuery({ description: '지역구', name: 'name' })
  showCity(@Query('name') name: string) {
    return this.userService.showCity(name);
  }

  @UseGuards(AuthGuard())
  @Get()
  findUserDetail(@GetUser() getUser) {
    return this.userService.tokenCheck(getUser);
  }
}
