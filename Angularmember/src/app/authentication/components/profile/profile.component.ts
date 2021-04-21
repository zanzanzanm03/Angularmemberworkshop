import { Component } from '@angular/core';
import { IProfileComponent } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  constructor() { }

  positionItems: any[] = [
    'studen1',
    'student2'
  ];
}
