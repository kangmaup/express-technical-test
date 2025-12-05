import { Response } from "express";
import { IApiResponse, IPaginatedResponse } from "../types";

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200,
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
  ) {
    const response: IApiResponse<T> = {
      success: true,
      message,
      data,
      statusCode
    };
    if (pagination) {
      response.pagination = pagination;
    }
  
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, statusCode = 500) {
    const response: IApiResponse = {
      success: false,
      message,
      statusCode
    };
    return res.status(statusCode).json(response);
  }
}
