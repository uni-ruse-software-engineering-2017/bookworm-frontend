import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Injectable({ providedIn: "root" })
@Pipe({
  name: "fileSize"
})
export class FileSizePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return this.getFileSize(value);
  }

  private getFileSize(n: number) {
    n = n || 0;
    if (n < 1024) {
      return n + "bytes";
    } else if (n >= 1024 && n < 1048576) {
      return (n / 1024).toFixed(1) + "KB";
    } else if (n >= 1048576) {
      return (n / 1048576).toFixed(1) + "MB";
    }
  }
}
