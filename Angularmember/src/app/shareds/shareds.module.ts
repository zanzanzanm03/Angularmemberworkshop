import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { ValidatorsService } from './services/validators.service';
import { SharedsService } from './services/shareds.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
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
    FormsModule,
    ModalModule,
    PaginationModule
  ],
  providers: [
    AlertService,
    SharedsService,
    ValidatorsService
  ]
})
export class SharedsModule { }
