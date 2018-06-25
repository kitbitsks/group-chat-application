
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public firstName:any;
  public lastName:any;
  public mobileNumber:any;
  public email:any;
  public password:any;

  constructor(public appService:GroupchatapiserviceService,public router:Router,public toastr:ToastsManager, vcr:ViewContainerRef)
  {
    this.toastr.setRootViewContainerRef(vcr);

  }
   

  ngOnInit() {
 
  }

  public goToSignIn: any= () =>{
    this.router.navigate(['/login']); 
  }//end goToSignIn

  public signupFunction: any=() =>{

    if(!this.firstName){
      this.toastr.warning('Enter First Name')
    }
    else if(!this.lastName){
      this.toastr.warning('Enter Last Name')
    }

    else if(!this.mobileNumber){
      this.toastr.warning('Enter Mobile Number')
    }

    else if(!this.email){
      this.toastr.warning('Enter email')
    }

    else if(!this.password){
      this.toastr.warning('Enter password')
    }

    else{

      let data = {
        firstName:this.firstName,
        lastName:this.lastName,
        mobileNumber:this.mobileNumber,
        email:this.email,
        password:this.password,
      }
      console.log(data);
      this.appService.signupFunction(data).subscribe((apiResponse)=>{
        console.log(apiResponse);

        if(apiResponse.status==200)
        {
          this.toastr.success('Signup Successfull');

          setTimeout(() => {
            this.goToSignIn();
          }, 2000);
        } else {
          this.toastr.error(apiResponse.message);
          
        }
      },
    (err)=>{
      this.toastr.error('some error occurred');
    });
    }
  }

}
