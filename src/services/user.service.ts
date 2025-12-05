import { UserRepository } from "../repositories/user.repository";
import { BcryptUtil } from "../utils/bcrypt.util";
import { MapperUtil } from "../utils/mapper.util";
import {
  ICreateUserDto,
  IUpdateUserDto,
  IUserResponse,
  IPaginatedResponse,
} from "../types";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<IUserResponse>> {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.userRepository.findAll(skip, limit),
      this.userRepository.count(),
    ]);
    return {
      data: MapperUtil.toUserResponseArray(users),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return MapperUtil.toUserResponse(user);
  }

  async createUser(data: ICreateUserDto): Promise<IUserResponse> {
    const existingUser = await this.userRepository.existsByUsername(
      data.username
    );

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await BcryptUtil.hash(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return MapperUtil.toUserResponse(user);
  }

  async updateUser(id: string, data: IUpdateUserDto): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (data.username && data.username !== user.username) {
      const usernameExists =
        await this.userRepository.existsByUsernameExcludingId(
          data.username,
          id
        );

      if (usernameExists) {
        throw new Error("Username already exists");
      }
    }

    const updateData: IUpdateUserDto = { ...data };

    if (data.password) {
      updateData.password = await BcryptUtil.hash(data.password);
    }

    const updatedUser = await this.userRepository.update(id, updateData);
    return MapperUtil.toUserResponse(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(id);
  }
}
