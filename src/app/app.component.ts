import { Component } from "@angular/core";
import { BookService } from "./core/services/book.service";

@Component({
  selector: "bw-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private bookService: BookService) {}

  title = "bookworm-frontend";
}
