import { AxiosInstance } from 'axios';
import { getAxios } from '@/core/api';
import {
  ILoginRequestDto,
  ILoginResponseDto,
  IRegisterRequestDto,
  IChangePasswordRequestDto,
} from '@/core/api/todo-list/auth/dto/auth.dto';

export class AuthApi {
  private axios: AxiosInstance;
  private apiURL: string;

  constructor(apiURL: string) {
    this.axios = getAxios();
    this.apiURL = apiURL;
  }

  public async fetchProfile() {
    const { data } = await this.axios.get(`${this.apiURL}/users/profile`);
    return data;
  }

  public async login(params: ILoginRequestDto): Promise<ILoginResponseDto> {
    const { data } = await this.axios.post(`${this.apiURL}/users/login`, params);
    return data;
  }

  public async register(params: IRegisterRequestDto) {
    const { data } = await this.axios.post(`${this.apiURL}/users/register`, params);
    return data;
  }

  public async changePassword(params: IChangePasswordRequestDto) {
    await this.axios.put(`${this.apiURL}/users/change-password`, params);
  }
}
