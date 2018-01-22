import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spliceStr'
})
export class SpliceStrPipe implements PipeTransform {

  transform(str:string, args:any): any {
    if(!str) return;
    let strr=str.slice(0,10);
    return strr
  }

}
