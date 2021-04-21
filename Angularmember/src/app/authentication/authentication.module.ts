import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRouting
  ],
  declarations: [
    DashboardComponent
  ]
})
export class AuthenticationModule { }
