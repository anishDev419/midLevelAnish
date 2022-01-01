export class RegisterData{
    private email: string;
    private username: string;
    private password: string;
    private cPassword: string;
    private role: string;
    private displayPic: File;
    private suspended: boolean;

    constructor(email: string, password: string, name: string, cPassword: string, role: string, displayPic: File, suspended: boolean){
        this.email = email;
        this.password = password;
        this.cPassword = cPassword;
        this.username = name;
        this.role = role;
        this.displayPic = displayPic;
        this.suspended = suspended
    }

    getEmail(): string{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }

    getName(): string{
        return this.username
    }

    getCPassword(): string{
        return this.cPassword;
    }

    getRole(): string{
        return this.role;
    }

    getDisplayPic(): File{
        return this.displayPic;
    }
}