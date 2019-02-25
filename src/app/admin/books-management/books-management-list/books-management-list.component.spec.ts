import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BooksManagementListComponent } from "./books-management-list.component";

describe("BooksManagementListComponent", () => {
  let component: BooksManagementListComponent;
  let fixture: ComponentFixture<BooksManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksManagementListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
