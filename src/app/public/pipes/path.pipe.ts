import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let index=value.lastIndexOf('/');
    return value.slice(index+1);
  }

}
