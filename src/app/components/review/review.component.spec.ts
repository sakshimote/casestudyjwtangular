import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Review } from './model/review.model';

import { ReviewComponent } from './review.component';
import { ReviewService } from './service/review.service';


describe('ReviewService', () => {
  let component:ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  let service:ReviewService;
  let review:Review;
  let productId:string;
  let reviews:Review[]



  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[ReviewService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ReviewComponent]

    })
    .compileComponents();

    service = TestBed .inject(ReviewService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
 review={
   productId:"",
   rating:0,
   reviewText:"",
   userName:"",
   reviewId:""
   }

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });



it("post review method check",(done:DoneFn)=>{

  htttpClientSpy.post.and.returnValue(of(review));
  service.postReview(review,productId).subscribe({
    next:(data)=>{
      expect(data).toEqual(review);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

});

});


