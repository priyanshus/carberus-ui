
export interface SignupRequestDto {
    email: string;
    password: string;
    confirmPassword: string;
    roles: string[];
}

export interface SignupResponseDto {
    id: string;
    email: string
    message: string;
}