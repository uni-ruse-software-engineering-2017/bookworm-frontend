import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AuthorService } from "../services/author.service";
import { IAuthor } from "../types/catalog";

@Injectable({ providedIn: "root" })
export class AuthorResolver implements Resolve<IAuthor> {
  constructor(private authorService: AuthorService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.authorService.getById(route.paramMap.get("authorId"));
  }
}
