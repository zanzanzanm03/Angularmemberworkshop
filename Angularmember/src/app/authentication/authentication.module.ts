import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
@NgModule({
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class AuthenticationModule { }
