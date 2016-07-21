import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class Filter implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value.length === 0) {
      return value;
    }
    let resultArray = [];
    for (let i = 0; i < value.length; i++) {
      let arrkey = Object.keys(value[i]);
      for (let j = 0; j < arrkey.length; j++){
        if(value[i][arrkey[j]].match('^.*' + args + '.*$')) {
          console.log(value[i][arrkey[j]]);
          console.log('^.*' + args + '.*$');
           resultArray.push(value[i]);

        }
      }
    }
    console.log(resultArray);
    return resultArray;
  }
}
