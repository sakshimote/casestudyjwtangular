import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../login/service/login.service";
import { User } from "../model/user.model";

@Injectable({
  providedIn: "root"
})
export class RegistrationService{

  private postRegistrationApi:string
  private getUsersApi:string


  constructor(private http: HttpClient,
    private loginService:LoginService){
    this.postRegistrationApi="http://localhost:1000/profile-service/api/user";
    this.getUsersApi="http://localhost:1000/profile-service/api/user";

  }

  public postRegistration(user:User):Observable<User>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.post<User>(this.postRegistrationApi,user,{headers: { authorization:tokenStr} })

  }

  public getUsers():Observable<User[]>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<User[]>(this.getUsersApi,{headers: { authorization:tokenStr}});
  }


}
