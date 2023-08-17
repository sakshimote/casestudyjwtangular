import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from './model/user.model';

import { ProfileComponent } from './profile.component';
import { ProfileServiceService } from './service/profile.service';

describe('ProfileService', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let service:ProfileServiceService ;
  let user:User;


  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[ProfileServiceService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ ProfileComponent  ]

    })
    .compileComponents();

    service = TestBed .inject(ProfileServiceService);
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

  it("get profile by userId method check ",(done:DoneFn)=>{

    htttpClientSpy.get.and.returnValue(of(user));
    service.getUserDetails(user.id).subscribe({
      next:(data)=>{
        expect(data).toEqual(user);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});


it("update profile method check ",(done:DoneFn)=>{

  htttpClientSpy.put.and.returnValue(of(user));
  service.updateUser(user.id,user).subscribe({
    next:(data)=>{
      expect(data).toEqual(user);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.put).toHaveBeenCalledTimes(1);

});


});


