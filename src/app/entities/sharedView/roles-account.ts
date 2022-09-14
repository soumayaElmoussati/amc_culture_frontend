export class RoleAccount {
    static clear() {
      return {
            refAccount:null,
            roles:[]
      }
    }
    refAccount:string;
    roles:string[];
  }
  