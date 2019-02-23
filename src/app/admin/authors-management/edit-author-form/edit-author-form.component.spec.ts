import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditAuthorFormComponent } from "./edit-author-form.component";

describe("EditAuthorFormComponent", () => {
  let component: EditAuthorFormComponent;
  let fixture: ComponentFixture<EditAuthorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAuthorFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
