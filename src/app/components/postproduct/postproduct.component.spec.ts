import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from './model/product.model';

import { PostproductComponent } from './postproduct.component';
import { PostProductService } from './service/postproduct.service';


describe('PostProductService', () => {
  let component: PostproductComponent;
  let fixture: ComponentFixture<PostproductComponent>;

  let service:PostProductService;
  let product:Product;

  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[PostProductService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ PostproductComponent ]

    })
    .compileComponents();

    service = TestBed .inject(PostProductService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
   product={
 category:null,
 categoryId:"",
 description:"",
 image:[],
 merchantId:"",
 merchantName:"",
 price:900,
 productName:"",
 productType:"",
 specification:null
          }

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("post product method check ",(done:DoneFn)=>{

    htttpClientSpy.post.and.returnValue(of(product));
    service.postProduct(product,product.categoryId).subscribe({
      next:(data)=>{
        expect(data).toEqual(product);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

});


});


