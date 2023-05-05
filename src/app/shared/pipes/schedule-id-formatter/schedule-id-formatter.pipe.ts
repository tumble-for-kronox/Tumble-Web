import { Pipe, PipeTransform } from '@angular/core';
import { SchoolEnum } from 'src/app/models/enums/schools';

@Pipe({
  name: 'scheduleIdFormatter'
})
export class ScheduleIdFormatterPipe implements PipeTransform {

  transform(value: string, school: SchoolEnum = SchoolEnum.NONE, ...args: unknown[]): string {
    if (school === SchoolEnum.HKR) {
      value = value.split('.')[1]
    }

    return value.replaceAll('+', ' ');
  }

}
