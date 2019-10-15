import {HttpClientModule, HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Params } from './params';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class ApiService{
    
    constructor(public httpella:HttpClient){}
    
    postParams(params : Params){
        let json = JSON.stringify(params)
        const data = {'param' : { 'MAXLINEA' : params.MAXLINEA, "MAXDIGIT" : params.MAXDIGIT, "MAXID" : params.MAXID}}
        const config = {headers : new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})}
        console.log(data)
        return this.httpella.post('http://127.0.0.1:8000/api/parametros/', data, config/*, config*/).subscribe(
            (data) =>{
                console.log(data);
            },
            (err : HttpErrorResponse) =>{
                if(err.error instanceof Error){
                    console.log("Client side err")
                }else{
                    console.log("Server side err")
                }
            }

        );
    }

}
