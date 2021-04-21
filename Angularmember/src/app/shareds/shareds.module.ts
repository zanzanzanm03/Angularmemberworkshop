import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
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
    AuthContentComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AlertService
  ]
})
export class SharedsModule { }
