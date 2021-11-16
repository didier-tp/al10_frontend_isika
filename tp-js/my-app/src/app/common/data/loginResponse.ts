export class LoginResponse{
    constructor(
        public username: string = "",
        public status : boolean = false,
        public message: string ="",
        public token: string | null = null,
        public roles : string =""){}
}