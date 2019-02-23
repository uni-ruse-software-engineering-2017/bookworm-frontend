import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { finalize } from "rxjs/operators";
import { AuthorService } from "src/app/core/services/author.service";
import { CreateAuthorFormComponent } from "../create-author-form/create-author-form.component";

interface IEditAuthorModel {
  name: string;
  biography: string;
  imageUrl?: string;
  bornAt: Date;
  diedAt?: Date | null;
}

@Component({
  selector: "bw-edit-author-form",
  templateUrl: "./edit-author-form.component.html",
  styleUrls: ["./edit-author-form.component.scss"]
})
export class EditAuthorFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public authorId: string,
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
  }

  ngOnInit() {
    this.toggleFormDisabledState(true);

    this.authorService
      .getById(this.authorId)
      .pipe(
        finalize(() => {
          this.toggleFormDisabledState(false);
        })
      )
      .subscribe(author => {
        const formData: IEditAuthorModel = {
          biography: author.biography,
          bornAt: author.bornAt,
          diedAt: author.diedAt,
          imageUrl: author.imageUrl,
          name: author.name
        };

        this.form.setValue(formData);
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value as IEditAuthorModel;

    this.toggleFormDisabledState(true);
    return this.authorService
      .edit(this.authorId, formData)
      .pipe(
        finalize(() => {
          this.toggleFormDisabledState(false);
        })
      )
      .subscribe(() => {
        this.modalRef.close(true);
      });
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
