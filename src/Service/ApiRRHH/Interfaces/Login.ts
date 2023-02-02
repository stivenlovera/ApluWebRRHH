
export interface loginDto {
    usuario: string,
    password: string,
    browserName:string,
    browserVersion:string
    osName:string;
}
export interface AuthenticationDto {
    token: string,
    expiration: string;
}
export interface responseLoginDto {
    status: number,
    message: string;
    data: AuthenticationDto
}