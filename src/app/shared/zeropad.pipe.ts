import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Injectable({ providedIn: "root" })
@Pipe({
  name: "zeropad"
})
export class ZeropadPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return this.padNumber(value, args ? Number(args) : undefined);
  }

  private padNumber(n: string, digits: number = 6) {
    let paddedInteger: string = n + "";
    while (paddedInteger.length < digits) {
      paddedInteger = "0" + paddedInteger;
    }
    return paddedInteger;
  }
}
