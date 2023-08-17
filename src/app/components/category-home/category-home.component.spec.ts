import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CategoryHomeComponent } from './category-home.component';
import { Category } from './model/category.model';
import { CategoryService } from './service/category.service';



describe('CategoryService', () => {
  let component: CategoryHomeComponent;
  let fixture: ComponentFixture<CategoryHomeComponent>;

  let service:CategoryService;
  let category:Category;
  let categories:Category[];
  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[CategoryService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ CategoryHomeComponent ]

    })
    .compileComponents();

    service = TestBed .inject(CategoryService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    category={
      categoryId:"cat1",
      categoryName:"category1",
      imgUrl:"caturl"
          }

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("get all categories method check",(done:DoneFn)=>{

    htttpClientSpy.get.and.returnValue(of(categories));
    service.getAllCategory().subscribe({
      next:(data)=>{
        expect(data).toEqual(categories);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});

it("get category by name method check",(done:DoneFn)=>{

  htttpClientSpy.get.and.returnValue(of(category));
  service.getcategoryByName(category.categoryName).subscribe({
    next:(data)=>{
      expect(data).toEqual(category);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});





});


