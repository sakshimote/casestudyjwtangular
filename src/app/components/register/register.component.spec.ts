import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from './model/user.model';

import { RegisterComponent } from './register.component';
import { RegistrationService } from './service/registration.service';

describe('RegisterService', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let service:RegistrationService ;
  let user:User;
  let users:User[];


  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[RegistrationService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [RegisterComponent ]

    })
    .compileComponents();

    service = TestBed .inject(RegistrationService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;


  user={
   plainTextPassword:"",
   address:{},
   dateOfBirth:null,
   email:"",
   fullName:"",
   gender:"",
   id:"",
   mobileNo:"",
   password:"",
   role:"",
   userName:""
  }

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("get users method check",(done:DoneFn)=>{

    htttpClientSpy.get.and.returnValue(of(users));
    service.getUsers().subscribe({
      next:(data)=>{
        expect(data).toEqual(users);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});

it("post user method check",(done:DoneFn)=>{

  htttpClientSpy.post.and.returnValue(of(user));
  service.postRegistration(user).subscribe({
    next:(data)=>{
      expect(data).toEqual(user);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

});

});

