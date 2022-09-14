import { NomenclatureValues } from "../settingView/nomenclature-values";
import { ProjectRequest } from "./project-request";
import { Subdomains } from "./subdomains";

export class ProjectResponse {
    static clear() {
        return {
              refProject:null,
              refDomain:null,
              startDate:null,
              endDate:null,
              amount:null,
              subDomain:null,
              domain:null,
              documents:[],
        }
      }
      refProject:string;
      startDate:string;
      endDate:string;
      amount:number;
      domain:string;
      subDomain:Subdomains;
      documents:DocumentResponse[];
      
      static  toProjectRequest(response:ProjectResponse):ProjectRequest
      {
            let request:ProjectRequest = new ProjectRequest;
            request.refProject=response.refProject;
            request.startDate=response.startDate;
            request.endDate=response.endDate;
            request.amount=response.amount;
            request.refSubDomain=response.subDomain.refSubDomain;
            request.refDocumentType=response.documents.map(
                  element=>element.value.id.toString()
            );
            return request;
      }
}
class DocumentResponse
{
      id:number;
      refProject:string;
      value:NomenclatureValues;
}
