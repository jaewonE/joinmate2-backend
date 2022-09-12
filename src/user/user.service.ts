import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOuput } from '../common/dtos/coreOutput.dto';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
  FindUserInput,
  FindUserOutput,
  SearchUserInput,
  SignTokenInput,
  SignTokenOutput,
  UpdateUserInput,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
import { JwtService } from './jwt/jwt.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userDB: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    uid,
    ...payload
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const isExist = await this.userDB.findOne({ where: { email } });
      if (isExist) {
        return {
          status: false,
          error: `An account with Email ${email} already exists.`,
        };
      }
      const result = await this.userDB.save(
        this.userDB.create({ email, uid, ...payload }),
      );
      console.log(result);
      return { status: true, token: this.jwtService.sign({ uid }) };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from createAccount',
        token: null,
      };
    }
  }

  async findUser({ uid }: FindUserInput): Promise<FindUserOutput> {
    try {
      const user = await this.userDB.findOne({ where: { uid } });
      return { status: true, user };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from findUser',
        user: null,
      };
    }
  }

  async searchUser({ email }: SearchUserInput): Promise<FindUserOutput> {
    try {
      const user = await this.userDB.findOne({ where: { email } });
      return { status: true, user };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from searchUser',
        user: null,
      };
    }
  }

  async updateUser(user: User, payload: UpdateUserInput): Promise<CoreOuput> {
    try {
      if (payload.email) {
        const isExist = await this.userDB.findOne({
          where: { email: payload.email },
        });
        if (isExist) {
          return {
            status: false,
            error: `An account with Email ${payload.email} already exists.`,
          };
        }
        user.email = payload.email;
      }
      user = { ...user, ...payload };
      await this.userDB.save(this.userDB.create(user));
      return { status: true };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from updateUser',
      };
    }
  }

  async deleteUser(uid: string): Promise<CoreOuput> {
    try {
      const user = await this.userDB.findOne({ where: { uid } });
      if (user) {
        await this.userDB.delete({ uid: user.uid });
        return { status: true };
      }
      return {
        status: false,
        error: 'User not found',
      };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from deleteUser',
      };
    }
  }

  async signToken({ uid }: SignTokenInput): Promise<SignTokenOutput> {
    try {
      const user = await this.userDB.findOne({ where: { uid } });
      if (user) {
        return { status: true, token: this.jwtService.sign({ uid: user.uid }) };
      }
      return {
        status: false,
        error: 'User not found',
      };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from signToken',
      };
    }
  }
}
