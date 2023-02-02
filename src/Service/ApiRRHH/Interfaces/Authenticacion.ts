export interface responseAutenticacionDto {
    status: number;
    message: string;
    data: AutenticacionDto
};
export interface AutenticacionDto {
    modulos: string[];
    nombreCompleto: string;
}