import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material";
import { ITreeNode } from "src/app/core/types";
import { ICategory } from "src/app/core/types/catalog";

@Component({
  selector: "bw-categories-tree",
  templateUrl: "./categories-tree.component.html",
  styleUrls: ["./categories-tree.component.scss"]
})
export class CategoriesTreeComponent implements OnInit {
  selected: ICategory = null;

  @Input() data: ITreeNode<ICategory>[];
  @Output() categorySelected = new EventEmitter<ICategory>();

  treeControl = new NestedTreeControl<ITreeNode<ICategory>>(
    node => node.children
  );
  dataSource = new MatTreeNestedDataSource<ITreeNode<ICategory>>();

  constructor() {}

  ngOnInit() {
    this.dataSource.data = this.data;
  }

  hasChild(_: number, node: ITreeNode<ICategory>) {
    return !!node.children && node.children.length > 0;
  }

  selectCategory(category: ICategory | null) {
    this.selected = category;
    this.categorySelected.emit(category);
  }
}
