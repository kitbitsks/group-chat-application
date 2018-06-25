import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public verificationCode:any;
  public newPassword:any;

  constructor(public appService:GroupchatapiserviceService,public router:Router,public toastr:ToastsManager, vcr:ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }


  public changePassword: any = () =>{
    if(!this.verificationCode){
      this.toastr.warning('Please Enter Verification Code !');
    }
    else if(!this.newPassword){
      this.toastr.warning('Please Enter new Password !');
    }
    else{
      let data={
        verificationCode: this.verificationCode,
        newPassword:this.newPassword
      }

      this.appService.changePasswordUser(data).subscribe((apiResponse)=>{

        if(apiResponse.status=200){
          console.log(apiResponse)
          if(apiResponse.data.n==1 && apiResponse.data.nModified==1 && apiResponse.data.ok==1){
              this.toastr.success('Password Changed Successfully !')

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);}
          else{
            this.toastr.error('It seems You are entering Wrong Verification Code','Oops!')
          }
//          this.router.navigate(['/chat']);
        }
        
        else{
          this.toastr.error(apiResponse.message)
        }
      },
        (err)=>{
          this.toastr.error('Invalid Email / Password');
      });
    }
  }
}
