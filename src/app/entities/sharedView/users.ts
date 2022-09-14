export class Users {
    static clear() {
        return {
            refAccount:null,
            firstname:null,
            lastname:null,
            cin:null,
            email:null,
            phoneNumber:null,
            password:null,
            accountType:null
        }
    }
    refAccount:string;
    firstname:string;
    lastname:string;
    cin:string;
    email:string;
    phoneNumber:string;
    password:string;
    accountType:string;
}
