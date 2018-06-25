import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserManagementModule } from './user-management/user-management.module';
import { RouterModule, Routes} from  '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { GroupchatapiserviceService } from './groupchatapiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GroupchatsocketserviceService } from './groupchatsocketservice.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ToastModule.forRoot(),
    UserManagementModule,
    RouterModule.forRoot([
      {path:'login', component:LoginComponent, pathMatch:'full'},
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'*', component:LoginComponent},
      {path:'**', component:LoginComponent}
    ])
  ],
  providers: [GroupchatapiserviceService,GroupchatsocketserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
