
export interface ILoginRequestDto {
    email: string;
    password: string;
}

export interface ILoginResponseDto {
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export interface IRegisterRequestDto {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IChangePasswordRequestDto {
    currentPassword: string;
    newPassword: string;
}
