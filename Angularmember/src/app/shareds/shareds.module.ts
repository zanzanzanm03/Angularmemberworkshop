import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule
  ],
  declarations: [
    AuthNavbarComponent
  ],
  exports: [
    AuthNavbarComponent,
    BsDropdownModule
  ]
})
export class SharedsModule { }
