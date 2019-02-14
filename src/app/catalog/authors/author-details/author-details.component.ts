import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { flatMap } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { IAuthor } from "src/app/core/types/catalog";

@Component({
  selector: "bw-author-details",
  templateUrl: "./author-details.component.html",
  styleUrls: ["./author-details.component.scss"]
})
export class AuthorDetailsComponent implements OnInit {
  author: IAuthor;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        flatMap((params: ParamMap) => {
          const authorId = params.get("authorId");

          return this.authorService.getById(authorId);
        })
      )
      .subscribe(author => {
        this.author = author;
      });
  }
}
