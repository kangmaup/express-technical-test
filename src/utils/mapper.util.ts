import { IUser, IUserResponse } from '../types';

export class MapperUtil {
  static toUserResponse(user: IUser): IUserResponse {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static toUserResponseArray(users: IUser[]): IUserResponse[] {
    return users.map(user => this.toUserResponse(user));
  }
}