import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "bw-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements OnInit {
  @Input() fileTypes = ".epub, .mobi, .pdf, .fb2, .txt";
  @Input() progress: { [key: string]: { progress: Observable<number> } } = null;
  @Output() filesChange = new EventEmitter();

  @ViewChild("fileInput") fileInput;

  files: Set<File> = new Set([]);

  ngOnInit() {}

  onFilesAdded() {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;

    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }

    this.filesChange.emit(this.files);
  }

  removeFile(file: File) {
    this.files.delete(file);

    this.filesChange.emit(this.files);
  }

  clearFiles() {
    this.files.clear();
    this.filesChange.emit(this.files);
  }
}
