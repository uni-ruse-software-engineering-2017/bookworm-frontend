import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { filter } from "rxjs/operators";
import { CategoryService } from "src/app/core/services/category.service";
import { ITreeNode } from "src/app/core/types";
import { ICategory } from "src/app/core/types/catalog";
import { CreateCategoryFormComponent } from "./create-category-form/create-category-form.component";

@Component({
  selector: "bw-category-management",
  templateUrl: "./category-management.component.html",
  styleUrls: ["./category-management.component.scss"]
})
export class CategoryManagementComponent implements OnInit {
  treeControl = new NestedTreeControl<ITreeNode<ICategory>>(
    node => node.children
  );
  dataSource = new MatTreeNestedDataSource<ITreeNode<ICategory>>();
  categoryTree: ITreeNode<ICategory>[];

  constructor(
    public categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCategoryTree();
  }

  getCategoryTree() {
    this.categoryService.getCategoryTree().subscribe(categoryTree => {
      this.categoryTree = categoryTree;
      this.dataSource.data = categoryTree;
    });
  }

  hasChild(_: number, node: ITreeNode<ICategory>) {
    return !!node.children && node.children.length > 0;
  }

  openAddCategoryModal() {
    const modalRef = this.dialog.open(CreateCategoryFormComponent);

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getCategoryTree();
      });
  }

  openEditCategoryModal(category: ICategory) {
    const modalRef = this.dialog.open(CreateCategoryFormComponent, {
      data: category
    });

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getCategoryTree();
      });
  }
}
