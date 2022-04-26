import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'sports-tournament';
  constructor(private cd: ChangeDetectorRef) {}
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  ngAfterViewInit(): void {
    this.drawer.open();
    this.cd.detectChanges();
  }
}
