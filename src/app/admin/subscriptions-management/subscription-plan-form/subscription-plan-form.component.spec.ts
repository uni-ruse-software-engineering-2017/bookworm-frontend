import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SubscriptionPlanFormComponent } from "./subscription-plan-form.component";

describe("SubscriptionPlanFormComponent", () => {
  let component: SubscriptionPlanFormComponent;
  let fixture: ComponentFixture<SubscriptionPlanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionPlanFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
