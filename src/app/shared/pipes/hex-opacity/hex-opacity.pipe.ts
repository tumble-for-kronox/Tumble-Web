import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hexOpacity'
})
export class HexOpacityPipe implements PipeTransform {

  transform(hexVal: string | null | undefined, alpha: number = 1, ...args: unknown[]): unknown {
    if (hexVal === undefined || hexVal === null) {
      return;
    }

    const alphaFixed = Math.floor(alpha * 255);
    let alphaHex = alphaFixed.toString(16);
    if (alphaHex.length < 2) {
      alphaHex = '0' + alphaHex;
    }

    const slicedHexVal = hexVal.slice(0, 7);
    return slicedHexVal + alphaHex;
  }

}
