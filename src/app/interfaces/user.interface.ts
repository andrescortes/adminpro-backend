export interface IUser {
    name: string;
    email: string;
    password: string;
    img?: string;
    role?: string;
    status?: boolean;
    google?: boolean;
}