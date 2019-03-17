import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReadBookOnlineComponent } from "./read-book-online.component";

describe("ReadBookOnlineComponent", () => {
  let component: ReadBookOnlineComponent;
  let fixture: ComponentFixture<ReadBookOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadBookOnlineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBookOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
