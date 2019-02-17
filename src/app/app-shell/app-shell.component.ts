import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { MatDrawer, MatSidenav } from "@angular/material";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { LoadingService } from "../core/loading.service";
import { ShoppingCartService } from "../core/services/shopping-cart.service";
import { IUserProfile } from "../core/types/user";

@Component({
  selector: "bw-app-shell",
  templateUrl: "./app-shell.component.html",
  styleUrls: ["./app-shell.component.scss"]
})
export class AppShellComponent implements OnInit {
  @Input() user: IUserProfile = null;
  @Input() isLoading = false;
  @Output()
  logoutClicked = new EventEmitter();

  @ViewChild("drawer")
  drawer: MatDrawer;

  @ViewChild("cartSideNav")
  cartSideNav: MatSidenav;

  shouldRenderDrawer: boolean;
  drawerMode: string;
  breadcrumb = "";

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver,
    public loading: LoadingService,
    public cart: ShoppingCartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Large])
      .subscribe(state => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.drawerMode = "over";
          this.shouldRenderDrawer = true;
        } else if (state.breakpoints[Breakpoints.Large]) {
          this.drawerMode = "side";
          this.shouldRenderDrawer = false;
        }
      });
  }

  ngOnInit() {
    // close the side drawer on navigation completed
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.drawer.close();
        this.cartSideNav.close();
      });
  }

  onLogoutClicked() {
    this.logoutClicked.emit();
  }
}
