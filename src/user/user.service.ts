import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CityMeta } from '../config/city.meta';

@Injectable()
export class UserService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async emailVerify(verifyUserDto: VerifyEmailDto) {
    // email 이 디비에 존재하면 에러 반환하기
    const { email } = verifyUserDto;
    await this.userRepository.findOne({ where: { email } }).then((user) => {
      if (user) {
        this.logger.error(
          `UNIQUE ERROR | DB에 ${email} 을 가진 다른 사용자가 존재합니다.`,
        );
        throw new BadRequestException('다른 이메일을 사용하세요');
      }
    });

    // 아니라면 이메일 전송
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const code: number = Date.now() + Number(process.env.RANDOM_NUMBER);
    const mailOptions = {
      to: email,
      sender: 'HEET Admin',
      subject: '[HEET] 회원가입 인증 메일',
      html: `
        <h1>하단의 코드를 회원가입 창에 입력해주세요.</h1><br/>
        <h3>${code}</h3>
      `,
    };
    await transporter.sendMail(mailOptions, function (err) {
      console.log('email sent');
      if (err) {
        console.log(err);
      }
    });
    return Object.assign({ code });
  }

  async create(createUserDto: CreateUserDto) {
    const { email, username, password, town } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      username,
      town,
    });
    await this.userRepository.save(user).catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        this.logger.error(
          `UNIQUE ERROR | DB에 ${username} 을 가진 다른 사용자가 존재합니다. `,
        );
        throw new BadRequestException(
          '같은 닉네임을 가진 사용자가 존재합니다.',
        );
      } else {
        this.logger.error('DB 등록 에러');
        throw new Error(err);
      }
    });
    this.logger.log(`${user.username}의 회원가입이 정상적으로 처리되었습니다.`);
    return Object.assign({ username: user.username });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.error(`이메일 오류로 ${email}의 로그인에 실패하였습니다.`);
      throw new BadRequestException('이메일 혹은 비밀번호를 확인하여 주세요');
    }
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      this.logger.log(`${email}의 로그인이 정상적으로 처리되었습니다.`);
      return {
        message: `Hello ${user.username}!`,
        token: accessToken,
      };
    } else {
      this.logger.error(`비밀번호 오류로 ${email}의 로그인에 실패하였습니다.`);
      throw new BadRequestException('이메일 혹은 비밀번호를 확인하여 주세요');
    }
  }

  async findDuplicateUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      this.logger.error(
        `UNIQUE ERROR | DB에 ${username} 을 가진 다른 사용자가 존재합니다.`,
      );
      return Object.assign({ isDuplicated: true });
    } else {
      return Object.assign({ isDuplicated: false }); // 만들어도 됨
    }
  }

  async tokenCheck(getUser) {
    return getUser;
  }

  showCity(cityName: string) {
    let city: object;
    if (cityName === 'incheon') city = { incheon: CityMeta.incheon };
    if (cityName === 'seoul') city = { seoul: CityMeta.seoul };
    if (cityName === 'gyeonggi') city = { gyeonggi: CityMeta.gyeonggi };

    return Object.assign(city);
  }

  async viewMyPage(getUser) {
    return await this.userRepository.findOne({
      where: {
        email: getUser.email,
      },
    });
  }

  editMyPage(getUser) {}
}
