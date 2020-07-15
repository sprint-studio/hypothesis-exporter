import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTHelper } from './helpers/jwt.helper';



@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JWTHelper, multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule { }
