import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { User } from "../model/user.model";
import { JwtModel } from "../model/JwtModel";

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string;
  public password: string;

  public request:JwtModel;

  getUserApi:string;
  createjwttoken:string;

  constructor(private http:HttpClient,private router:Router) {
    this.getUserApi="http://localhost:1000/profile-service/api/user/username/";
    this.createjwttoken="http://localhost:1000/profile-service/api/authenticate"

    
    this.username="";
    this.password="";
    this.request={

    }


 }


 createjwttokenmethod(request){
  return this.http.post("http://localhost:1000/profile-service/api/authenticate",request);
 }


 viewtoken(token:string){
  console.log(token);
  let tokenStr="Bearer "+token;
  console.log(tokenStr);

  const headers=new HttpHeaders().set("Authorization",tokenStr);
  localStorage.setItem("Authorization",tokenStr);
  localStorage.setItem("token",token);
  return this.http.get("http://localhost:1000/profile-service/api/user/username/",
  {headers, responseType:'text' as 'json'});

 }






 authenticationService(jwtequest:JwtModel) {
 this.http.get(this.getUserApi+this.request.username,
   //
    //{ headers: { Authorization : this.createjwttokenmethod(this.request) } }).pipe(map((res) => {
    //  this.username = this.request.username;
     // this.password = this.request.password;
      //this.registerSuccessfulLogin( this.request.username, this.request.password);
    //})
    );

    return (this.createjwttokenmethod,jwtequest);



}

createBasicAuthToken(username: string, password: string) {
  return 'Basic ' + window.btoa(username + ":" + password)
}

registerSuccessfulLogin(username:string, password:string) {
  localStorage.setItem("auth",this.createBasicAuthToken(username,password))
  sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,username);
}

isUserLoggedIn() {
  let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  if (user === null) return false
  return true
}

getLoggedInUserName() {
  let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  if (user === null) return ''
  return user
}

getUserByUsername(username:string):Observable<User>{
  // let token1:string|null=localStorage.getItem("Authorization");
  // let token="";
  // console.log(token1);
  // return this.http.get<User>(this.getUserApi+this.request.username, { headers: { authorization:token1 || token} });
 let token=localStorage.getItem("token");
  //console.log(token);
  let tokenStr="Bearer "+token;
//  console.log(tokenStr);

  //const headers=new HttpHeaders().set("Authorization",tokenStr);
  // localStorage.setItem("Authorization",tokenStr);
  // localStorage.setItem("token",token);


  console.log(username);

  // this.http.get<User>("http://localhost:1000/profile-service/api/user/username/"+username);

  return this.http.get<User>(this.getUserApi+username,
  { headers: { authorization:tokenStr} });




}



}
