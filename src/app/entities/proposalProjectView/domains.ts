import { Subdomains } from "./subdomains";

export class Domains {
    static clear() {
      return {
            refDomain:null,
            shortName:null,
            longName:null,
            shortNameAr:null,
            longNameAr:null,
            subDomains:[],
            component:null
      }
    }
    refDomain:string;
    shortName:string;
    longName:string;
    shortNameAr:string;
    longNameAr:string;
    subDomains:Subdomains[];
    component:string;
}
