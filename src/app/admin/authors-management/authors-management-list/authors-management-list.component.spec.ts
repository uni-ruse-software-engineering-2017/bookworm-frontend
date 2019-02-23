import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthorsManagementListComponent } from "./authors-management-list.component";

describe("AuthorsManagementListComponent", () => {
  let component: AuthorsManagementListComponent;
  let fixture: ComponentFixture<AuthorsManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsManagementListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
