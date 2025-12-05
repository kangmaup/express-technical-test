import { UserRepository } from '../repositories/user.repository';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtUtil } from '../utils/jwt.util';
import { MapperUtil } from '../utils/mapper.util';
import { ICreateUserDto, ILoginDto, IAuthResponse } from '../types';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(data: ICreateUserDto): Promise<IAuthResponse> {
    const existingUser = await this.userRepository.findByUsername(data.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await BcryptUtil.hash(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword
    });

    const token = JwtUtil.sign({
      userId: user.id,
      username: user.username
    });

    return {
      token,
      user: MapperUtil.toUserResponse(user)
    };
  }

  async login(data: ILoginDto): Promise<IAuthResponse> {
    const user = await this.userRepository.findByUsername(data.username);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await BcryptUtil.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const token = JwtUtil.sign({
      userId: user.id,
      username: user.username
    });

    return {
      token,
      user: MapperUtil.toUserResponse(user)
    };
  }
}