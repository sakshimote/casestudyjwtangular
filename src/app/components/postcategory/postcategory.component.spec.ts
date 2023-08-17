import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Category } from './model/category.model';

import { PostcategoryComponent } from './postcategory.component';
import { PostCategoryService } from './service/postcategory.service';


describe('PostCategoryService', () => {
  let component: PostcategoryComponent;
  let fixture: ComponentFixture<PostcategoryComponent>;

  let service: PostCategoryService ;
  let category:Category

  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[PostCategoryService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ PostcategoryComponent ]

    })
    .compileComponents();

    service = TestBed .inject(PostCategoryService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  category={
categoryName:"",
imgUrl:""
          }

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("post category method check ",(done:DoneFn)=>{

    htttpClientSpy.post.and.returnValue(of(category));
    service.postCategory(category).subscribe({
      next:(data)=>{
        expect(data).toEqual(category);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

});


});

