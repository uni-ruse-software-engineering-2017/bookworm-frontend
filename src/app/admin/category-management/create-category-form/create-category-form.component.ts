import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CategoryService } from "src/app/core/services/category.service";
import { IPaginatedResource } from "src/app/core/types";
import { ICategory } from "src/app/core/types/catalog";
import { emptyResource } from "src/app/util/pagination";

interface ICreateCategoryModel {
  name: string;
  parentId: string | null;
}

@Component({
  selector: "bw-create-category-form",
  templateUrl: "./create-category-form.component.html",
  styleUrls: ["./create-category-form.component.scss"]
})
export class CreateCategoryFormComponent implements OnInit {
  mode: "create" | "edit" = "create";
  form: FormGroup;
  filteredCategories: Observable<ICategory[]> = of([]);
  categories: IPaginatedResource<ICategory> = emptyResource();

  constructor(
    public modalRef: MatDialogRef<CreateCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private categoryData: ICategory,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    if (this.categoryData) {
      this.mode = "edit";
      this.form = this.fb.group({
        name: [this.categoryData.name, [Validators.required]],
        parentId: [null]
      });
    } else {
      this.form = this.fb.group({
        name: ["", [Validators.required]],
        parentId: [null]
      });
    }
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;

      if (this.mode === "edit") {
        // set the parent category value
        this.form.controls.parentId.setValue(
          this.categories.items.find(
            category => category.id === this.categoryData.parentId
          )
        );
      }
    });

    this.filteredCategories = this.form.get("parentId").valueChanges.pipe(
      startWith<string | ICategory>(""),
      map(value => value || ""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name =>
        name ? this._filterCategories(name) : this.categories.items.slice()
      )
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    const chosenParentCategory: ICategory = this.form.get("parentId").value;
    const formData: ICreateCategoryModel = {
      name: this.form.get("name").value,
      parentId: chosenParentCategory ? chosenParentCategory.id : null
    };

    if (this.mode === "create") {
      this.create(formData);
    } else if (this.mode === "edit") {
      this.edit(this.categoryData.id, formData);
    }
  }

  create(formData: ICategory) {
    return this.categoryService.create(formData).subscribe(() => {
      this.modalRef.close(true);
    });
  }

  edit(categoryId: string, formData: ICategory) {
    return this.categoryService.edit(categoryId, formData).subscribe(() => {
      this.modalRef.close(true);
    });
  }

  displayCategoryFn(category?: ICategory) {
    return category ? category.name : undefined;
  }

  private _filterCategories(name: string): ICategory[] {
    const filterValue = name.toLowerCase();

    if (!this.categories) {
      return [];
    }

    return this.categories.items.filter(
      option => option.name.toLowerCase().indexOf(filterValue) >= 0
    );
  }
}
