import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff'
})
export class TimeDiffPipe implements PipeTransform {
  transform(timeOne: string, timeTwo: string): number {
    const start = new Date(timeOne).getTime(),
      end = new Date(timeTwo).getTime();
    return Math.floor((end - start) / (1000 * 60)) < 0 ? 0 : Math.floor((end - start) / (1000 * 60));
  }
}
