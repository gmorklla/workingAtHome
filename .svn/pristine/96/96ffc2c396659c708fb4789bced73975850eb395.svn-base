import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderBy implements PipeTransform {
  transform(value: Array<any>, prop: string, order: string): any {
    if (value) {
      order === 'asc'
        ? value.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
        : value.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
      return value;
    } else {
      return value;
    }
  }
}

@Pipe({ name: 'nednF' })
export class NednF implements PipeTransform {
  transform(nedn) {
    return nedn ? nedn.match(/(?<=^.+(?:=.+){2}=)(.+)/g)[0] : nedn;
  }
}
