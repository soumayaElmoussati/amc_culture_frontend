import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorResponse } from 'src/app/entities/AuthorResponse';

import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class WritersService {

  constructor(private http:HttpClient) { }

  createNewWriter(){
  
  
   //let f = new File([""], picture);

   /*const header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  });*/


  // headers = headers.append('Content-Type', 'multipart/form-data');
   //headers = headers.append('enctype', 'multipart/form-data');
  
    return null;
  }}
