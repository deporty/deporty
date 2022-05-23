import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() paths!: string[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((x) => {});
    this.buildRoutes(this.activatedRoute.root);
  }
  buildRoutes(route: ActivatedRoute) {
    let label =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.data : '';
    route.data.subscribe((x) => {});

    route.url.subscribe((x) => {});
  }
}
