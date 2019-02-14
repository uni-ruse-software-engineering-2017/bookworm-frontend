import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/core/services/category.service";
import { ICategory } from "src/app/core/types/catalog";

@Component({
  selector: "bw-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[];
  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories.items;
    });
  }
}
