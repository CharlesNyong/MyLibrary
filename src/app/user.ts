export class User {
    private email: string;
    private password: string;
    private name: string;
    private userID: string;
    constructor(email?: string, password?: string, name?: string, id?: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.userID = id;
    }
    
    getName(): string{
        return this.name;
    }

    getEmail(): string{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }

    getID(): string{
        return this.userID;
    }
}
