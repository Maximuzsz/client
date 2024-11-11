export interface IUser {
    username?: string;
    token?: string;
    id?: string;
    empresa_id?: string;
}

export interface IContext extends IUser {
    authenticate:(username: string, senha:string) => Promise<void>;
    logout:()=>void;
}

export interface IAuthProvider{
    children: JSX.Element;
}