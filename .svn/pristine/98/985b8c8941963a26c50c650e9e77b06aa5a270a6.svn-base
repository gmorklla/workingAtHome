import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CleanTransformService {
  constructor() {}

  getNumValueNoPX(value) {
    return Number(String(value).replace('px', ''));
  }

  sumCoords(prev, curr) {
    return [prev, curr].reduce((p, c) => [
      this.getNumValueNoPX(p[0]) + this.getNumValueNoPX(c[0]),
      this.getNumValueNoPX(p[1]) + this.getNumValueNoPX(c[1]),
      this.getNumValueNoPX(p[2]) + this.getNumValueNoPX(c[2])
    ]);
  }

  cleanTransform(transform: string): Array<string> {
    const reg = /\(([^)]+)\)/g;
    const matches = transform.match(reg);
    if (matches.length > 1) {
      const mapped = matches
        .map(match =>
          match
            .replace('(', '')
            .replace(')', '')
            .split(',')
        )
        .reverse();
      const reduced = mapped
        .reduce((prev, curr) => this.sumCoords(prev, curr))
        .map(val => val + 'px');
      return reduced;
    } else {
      matches[0] = matches[0].replace('(', '').replace(')', '');
      return matches;
    }
  }
}
