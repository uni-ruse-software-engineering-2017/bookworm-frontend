import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BreadcrumbsService } from "@exalif/ngx-breadcrumbs";

@Component({
  selector: "bw-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  constructor(
    public breadcrumbService: BreadcrumbsService,
    private location: Location
  ) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
