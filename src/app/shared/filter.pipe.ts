import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class Filter implements PipeTransform {
  transform(value:any, args?:any):any {
    if (args == null) {
      console.log('if (args == null)');
      return value;
    }

    let resultArray = [];

    value.map((item) => {
      const itemKeys = Object.keys(item);

      let contains;

      itemKeys.map((key) => {
        if (item[key].match(`^.*${args}.*$`)) {
          contains = true
        }
      })

      if (contains) resultArray.push(item)
    })

    return resultArray;
  }
}
