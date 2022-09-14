import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  storeDocs(data: Array<any>) {
    let httpRequests = [];
    data.forEach(e => {
      const formData = new FormData();
      formData.append('documentType', e["documentType"]);
      formData.append('refObject', e["refObject"]);
      formData.append('refParent', e["refParent"]);
      formData.append('file', e["file"]);
      httpRequests.push(this.http.post<any[]>(`${ENV["backend-api-base-url"]}/documents/`, formData));
    });

    return forkJoin(httpRequests);
  }

  getCategoriesAward(refDocument: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/documents/${refDocument}/visualizeDocument`);
  }


  updateDocuments(data: Array<any>) {
    let httpRequests = [];
    data.forEach(e => {
      const formData = new FormData();
      formData.append('refDocument', e["refDocument"]);
      formData.append('file', e["file"]);
      httpRequests.push(this.http.put<any>(`${ENV["backend-api-base-url"]}/documents/${formData.get("refDocument")}`, formData));
    });

    return forkJoin(httpRequests);
  }


}
