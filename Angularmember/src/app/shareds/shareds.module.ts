import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
    RouterModule
  ],
  declarations: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent
  ],
  exports: [
    AuthNavbarComponent,
    BsDropdownModule,
    AuthSidebarComponent,
    AuthContentComponent
  ]
})
export class SharedsModule { }
