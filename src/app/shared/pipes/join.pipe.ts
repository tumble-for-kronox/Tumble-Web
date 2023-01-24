import { Input, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(input: Array<any>, sep = ',', ...args: unknown[]): unknown {
    return input.join(sep);
  }

}
