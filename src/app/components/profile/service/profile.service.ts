import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser, User } from '../../login/model/user.model';
import { LoginService } from '../../login/service/login.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  getUserDetailsApi:string;
  updateUserApi:string;

  constructor(private http:HttpClient,
    private loginService:LoginService) {

    this.getUserDetailsApi="http://localhost:1000/profile-service/api/user/";
    this.updateUserApi="http://localhost:1000/profile-service/api/update/user/";
  }

  getUserDetails(userId: string) :Observable<User>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<User>(this.getUserDetailsApi+userId,{headers: { authorization:tokenStr} });
  }

  updateUser(userId: string,userDetails:UpdateUser):Observable<User>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.put<User>(this.updateUserApi+userId,userDetails,{headers: { authorization:tokenStr} });
  }
}
