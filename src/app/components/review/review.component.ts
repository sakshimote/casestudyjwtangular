import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Product } from '../productdetails/model/product.model';
import { ProductDetailsService } from '../productdetails/service/product.details';
import { ProductService } from '../products/service/product.service';
import { Review } from './model/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews:Review[];
  review:Review;
  username:string;
  reviewForm:FormGroup;
  showReviewForm:boolean;
  pid:string;
  reviewArray:Review[];
  errorMsg:string;
  starNums:number[];
  product:Product;


  constructor(private actRoute:ActivatedRoute,private productDetailsService:ProductDetailsService,
    private appService:AppService) { }

  ngOnInit(): void {

    this.username=localStorage.getItem("userName");


    this.showReviewForm=false;
    this.starNums=[0,0,0,0,0];
    this.reviewForm=new FormGroup({
      reviewText:new FormControl(''),
      rating:new FormControl(1)
    });

    this.actRoute.params.subscribe(
      params=>{
        this.pid=params['productid'];
        console.log(this.pid);
        this.productDetailsService.getProductsByProductId(this.pid).subscribe(data1=>{
      this.product=data1;
        })
       this.productDetailsService.getReviewsBypID(params['productid']).subscribe(data=>{

        this.appService.reviewCount.next(data.length);
         this.reviews=data;
         this.reviewArray=this.reviews;
         this.updateRatingCount();

       },error=>{
         this.errorMsg="error in loading reviews, please contact administrator!";

       });

      }
    );



  }

  filterReview=(rating:number)=>{
    this.reviewArray=this.reviews.filter(r=>r.rating===rating);


  }


  updateRatingCount(){
    this.starNums[0]=this.reviews.filter(r=>r.rating===5).length;
    this.starNums[1]=this.reviews.filter(r=>r.rating===4).length;
    this.starNums[2]=this.reviews.filter(r=>r.rating===3).length;
    this.starNums[3]=this.reviews.filter(r=>r.rating===2).length;
    this.starNums[4]=this.reviews.filter(r=>r.rating===1).length;

  }


  onReviewDelete(rid:string){
    this.productDetailsService.deleteReview(rid).subscribe(data=>{
     this.reviewArray= this.reviewArray.filter(r=>r.reviewId!==rid);
     this.reviews=this.reviewArray;
     this.appService.reviewCount.next(this.reviews.length);

     this.updateRatingCount();
    });
  }

  showAllReviews=()=>{
    this.reviewArray=this.reviews;
  }
  postReview(){
    this.showReviewForm=!this.showReviewForm;
    }

    onPostReview(){

      this.review={
        reviewText:this.reviewForm.value.reviewText,
        rating:this.reviewForm.value.rating,
       userName:this.username,
       productId:this.pid

      }
      this.productDetailsService.postReview(this.review,this.pid).subscribe(data=>{


        this.reviewArray.push(data);
        this.reviews=this.reviewArray;
        this.appService.reviewCount.next(this.reviews.length);
        this.showReviewForm=!this.showReviewForm;
        this.updateRatingCount();
      });
      alert("review posted");
    }

}
