import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrinterResponse } from 'src/app/entities/PrinterResponse';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class PrintingsService {

  constructor(private http:HttpClient) { }

  createPrinter(data:any){
    
    return this.http.post<PrinterResponse>(`${ENV["backend-api-base-url"]}/participant/printers/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updatePrinter(data:any){
    
    return this.http.put<PrinterResponse>(`${ENV["backend-api-base-url"]}/participant/printers/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
}
