export interface IUser {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDto {
  name: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface IUpdateUserDto {
  name?: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
}

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUserResponse;
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface JwtPayload {
  userId: string;
  username: string;
}
