import { Component } from '@angular/core';
import { School, schoolList } from 'src/app/models/school';

@Component({
  selector: 'school-picker',
  templateUrl: './school-picker.component.html',
  styleUrls: ['./school-picker.component.scss']
})
export class SchoolPickerComponent {
  schools: School[] = schoolList;
}
