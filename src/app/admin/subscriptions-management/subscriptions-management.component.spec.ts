import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SubscriptionsManagementComponent } from "./subscriptions-management.component";

describe("SubscriptionsManagementComponent", () => {
  let component: SubscriptionsManagementComponent;
  let fixture: ComponentFixture<SubscriptionsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsManagementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
