import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthorsManagementComponent } from "./authors-management.component";

describe("AuthorsManagementComponent", () => {
  let component: AuthorsManagementComponent;
  let fixture: ComponentFixture<AuthorsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsManagementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
