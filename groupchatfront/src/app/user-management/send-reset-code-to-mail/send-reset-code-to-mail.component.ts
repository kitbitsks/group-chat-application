import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GroupchatapiserviceService } from '../../groupchatapiservice.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-send-reset-code-to-mail',
  templateUrl: './send-reset-code-to-mail.component.html',
  styleUrls: ['./send-reset-code-to-mail.component.css']
})
export class SendResetCodeToMailComponent implements OnInit {

  public regEmail:any
  constructor(public appService:GroupchatapiserviceService,public router:Router,public toastr:ToastsManager, vcr:ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  public sendMail: any = () =>{
    if(!this.regEmail)
      this.toastr.warning('Please Enter Email Id')
    else{
      let data = {
        newEmail : this.regEmail
      }
    this.appService.requestVerificationCode(data).subscribe((apiResponse)=>{
      if(apiResponse.status==200){
          this.toastr.success('Verification Code sent to Your Email')
          setTimeout(() => {
            this.router.navigate(['/fgtPswd']);
          }, 3000);
        }
      else{
        this.toastr.error(apiResponse.message)
      }
    },
      (err)=>{
        this.toastr.error('Invalid Email');
    })
    }
  }

}
