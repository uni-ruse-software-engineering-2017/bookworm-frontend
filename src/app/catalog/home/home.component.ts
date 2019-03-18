import { Component, OnInit } from "@angular/core";
import { BookService } from "src/app/core/services/book.service";
import { IBookListItem } from "src/app/core/types/catalog";

@Component({
  selector: "bw-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  featuredBooks: IBookListItem[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    return this.bookService.getFeaturedBooks().subscribe(featuredBooks => {
      this.featuredBooks = featuredBooks;
    });
  }
}
