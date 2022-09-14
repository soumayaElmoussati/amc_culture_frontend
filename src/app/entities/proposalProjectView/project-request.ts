export class ProjectRequest {
      static clear() {
        return {
              startDate:null,
              endDate:null,
              amount:null,
              refSubDomain:null,
              refDocumentType:[],
              refProject:null,
        }
      }
      startDate:string;
      endDate:string;
      amount:number;
      refSubDomain:string;
      refDocumentType:string[];
      refProject:string;
}
