import { MediaMatcher } from "@angular/cdk/layout";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatDrawer } from "@angular/material";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { LoadingService } from "../core/loading.service";

@Component({
  selector: "bw-app-shell",
  templateUrl: "./app-shell.component.html",
  styleUrls: ["./app-shell.component.scss"]
})
export class AppShellComponent implements OnInit, OnChanges, OnDestroy {
  @Output()
  logoutClicked = new EventEmitter();

  @ViewChild("drawer")
  drawer: MatDrawer;

  shouldRenderDrawer: boolean;
  drawerMode: string;
  isLoading = false;
  breadcrumb = "";

  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public loading: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 1024px)");
    this.mobileQueryListener = () => {
      this.drawerMode = this.isMobile() ? "over" : "side";
      this.shouldRenderDrawer = !this.isMobile();
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    // close the side drawer on navigation completed
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && this.isMobile()))
      .subscribe(() => {
        this.drawer.close();
      });

    // listen for route changes in order to update the breadcrumbs
    // this.router.events
    //   .pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     switchMap(() => this.route.firstChild && this.route.firstChild.data)
    //   )
    //   .subscribe(data => {
    //     this.breadcrumb = data.breadcrumb || "";
    //   });

    this.loading.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.drawerMode = this.isMobile() ? "over" : "side";
    this.shouldRenderDrawer = !this.isMobile();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  isMobile() {
    return this.mobileQuery.matches;
  }

  onLogoutClicked() {
    this.logoutClicked.emit();
  }
}
