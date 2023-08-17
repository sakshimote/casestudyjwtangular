import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from './model/category.model';

import { PostCategoryService } from './service/postcategory.service';

@Component({
  selector: 'app-postcategory',
  templateUrl: './postcategory.component.html',
  styleUrls: ['./postcategory.component.css']
})
export class PostcategoryComponent implements OnInit {

  categoryForm:FormGroup;
  category:Category;

  constructor(private postCategoryService:PostCategoryService) {
    this.category={
      categoryName:"",
      imgUrl:"",
    }
    this.categoryForm= new FormGroup({
      "categoryName":new FormControl("",Validators.required),
      "imgUrl":new FormControl("",Validators.required),

    });
  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.category.categoryName = this.categoryForm.value.categoryName;
    this.category.imgUrl = this.categoryForm.value.imgUrl;

    this.postCategoryService.postCategory(this.category).subscribe(data=>{
      alert("category posted succesfully");
      console.log(data);
    },
    error=>{
      console.log("postcategory Error");
    }
    );
  }
}
