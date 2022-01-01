export class LoginData{
    private username: string;
    private password: string;
    private suspended: boolean;

    constructor(username: string, password: string, suspended: boolean){
        this.username = username;
        this.password = password;
        this.suspended = suspended;
    }

    getEmail(): string{
        return this.username;
    }

    getPassword(): string{
        return this.password;
    }
}