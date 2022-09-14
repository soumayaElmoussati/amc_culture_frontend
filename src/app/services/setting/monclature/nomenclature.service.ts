import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nomenclature } from 'src/app/entities/settingView/nomenclature';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class NomenclatureService {

  getNomenclature(ref:string):Observable<Nomenclature>
  {
    return this.http.get<Nomenclature>(`${ENV["backend-api-base-url"]}/setting/nomenclatures/${ref}`);
  }
  getNomsenclature():Observable<Nomenclature[]>
  {
    return this.http.get<Nomenclature[]>(`${ENV["backend-api-base-url"]}/setting/nomenclatures`);
  }
  getNomenclatureDocuments():Observable<Nomenclature>
  {
    return this.getNomenclature("DOCUMENT_TYPE");
  }
  constructor(private http:HttpClient) { }
}
