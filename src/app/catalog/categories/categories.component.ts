import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CategoryService } from "src/app/core/services/category.service";
import { ITreeNode } from "src/app/core/types";
import { ICategory } from "src/app/core/types/catalog";

@Component({
  selector: "bw-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode<ICategory>>(
    node => node.children
  );
  dataSource = new MatTreeNestedDataSource<ITreeNode<ICategory>>();
  categoryTree: ITreeNode<ICategory>[];

  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategoryTree().subscribe(categoryTree => {
      this.categoryTree = categoryTree;
      this.dataSource.data = categoryTree;
    });
  }

  hasChild(_: number, node: ITreeNode<ICategory>) {
    return !!node.children && node.children.length > 0;
  }
}
