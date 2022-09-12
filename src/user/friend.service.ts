import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOuput } from '../common/dtos/coreOutput.dto';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  AddFriendInput,
  DeleteFriendsInput,
  GetFriendsOutput,
} from './dtos/friend.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(User) private readonly userDB: Repository<User>,
  ) {}

  async addFriend(
    userUid: string,
    { email }: AddFriendInput,
  ): Promise<CoreOuput> {
    try {
      const user = await this.userDB.findOne({
        where: { uid: userUid },
        relations: { followers: true },
      });
      if (!user) {
        return { status: false, error: 'User not Found' };
      }
      if (user.email === email) {
        return { status: false, error: 'Can not add self as friend' };
      }
      const friend = await this.userDB.findOne({ where: { email } });
      if (!friend) {
        return { status: false, error: `User with email ${email} not found` };
      }
      for (const friendItem of user.followers) {
        if (friendItem.uid === friend.uid) {
          return {
            status: false,
            error: `User with email ${email} already exist`,
          };
        }
      }
      user.followers = [...user.followers, friend];
      await this.userDB.save(user);
      return { status: true };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from addFriend',
      };
    }
  }

  async getFriends(userUid: string): Promise<GetFriendsOutput> {
    try {
      const user = await this.userDB.findOne({
        where: { uid: userUid },
        relations: { followers: true },
      });
      if (!user) {
        return { status: false, error: 'User not Found' };
      }
      return { status: true, friends: user.followers };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from getFriends',
      };
    }
  }

  /**존재하지 않는 uid에 대해서는 경고 및 예외를 두지 않는다. */
  async deleteFriends(
    userUid: string,
    { uidList }: DeleteFriendsInput,
  ): Promise<CoreOuput> {
    try {
      const user = await this.userDB.findOne({
        where: { uid: userUid },
        relations: { followers: true },
      });
      if (!user) {
        return { status: false, error: 'User not Found' };
      }
      const friends = await this.userDB.find({ where: { uid: In(uidList) } });
      const friendUidList = friends.map((friend) => friend.uid);
      user.followers = user.followers
        .map((follower) =>
          friendUidList.find((uid) => uid === follower.uid)
            ? undefined
            : follower,
        )
        .filter((item) => item);
      await this.userDB.save(user);
      return { status: true };
    } catch (e) {
      return {
        status: false,
        error: 'Unexpected error from deleteFriends',
      };
    }
  }
}
