import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { finalize } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";

interface ICreateAuthorModel {
  name: string;
  biography: string;
  imageUrl?: string;
  bornAt: Date;
  diedAt?: Date | null;
}

@Component({
  selector: "bw-create-author-form",
  templateUrl: "./create-author-form.component.html",
  styleUrls: ["./create-author-form.component.scss"]
})
export class CreateAuthorFormComponent implements OnInit {
  form: FormGroup;
  searchInput: FormControl;
  isLoading = false;
  searchError = false;

  constructor(
    public modalRef: MatDialogRef<CreateAuthorFormComponent>,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      biography: [""],
      imageUrl: [""],
      bornAt: [""],
      diedAt: [""]
    });

    this.searchInput = this.fb.control("");
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value as ICreateAuthorModel;

    return this.authorService.create(formData).subscribe(() => {
      this.modalRef.close(true);
    });
  }

  searchAuthor() {
    // disable all fields while loading
    this.isLoading = true;
    this.searchError = false;
    this.toggleFormDisabledState(this.isLoading);

    this.authorService
      .searchInGoodReadsByName(this.searchInput.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.toggleFormDisabledState(this.isLoading);
        })
      )
      .subscribe(
        author => {
          this.form.setValue(author);
        },
        (error: HttpErrorResponse) => {
          this.searchError = true;
        }
      );
  }

  toggleFormDisabledState(state: boolean) {
    Object.keys(this.form.controls).forEach(name => {
      if (state) {
        this.form.get(name).disable();
      } else {
        this.form.get(name).enable();
      }
    });
  }
}
