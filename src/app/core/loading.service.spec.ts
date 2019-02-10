import { TestBed } from "@angular/core/testing";
import { LoadingService } from "./loading.service";

describe("LoadingService", () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });

    service = TestBed.get(LoadingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#start should make the loading status active", () => {
    service.start();
    expect(service.isLoading()).toBeTruthy();
  });

  it("#complete should make the loading status inactive", () => {
    service.start();
    service.complete();
    expect(service.isLoading()).toBeFalsy();
  });

  it("#complete should remove only one pending request if there are more", () => {
    service.start();
    service.start();
    service.complete();
    expect(service.isLoading()).toBeTruthy();
  });
});
