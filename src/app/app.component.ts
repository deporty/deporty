import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'sports-tournament';

  typeBySize = {
    side: (size: number) => {
      return size >= 768;
    },
    over: (size: number) => {
      return size < 768;
    },
  };
  mode: MatDrawerMode;
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(private cd: ChangeDetectorRef) {
    this.mode = 'over';
  }
  ngOnInit(): void {
    this.checkScreenWidth();
    window.onresize = (event: any) => {
      this.checkScreenWidth();
    };
  }

  checkScreenWidth() {
    const width = window.outerWidth;
    for (const mode in this.typeBySize) {
      if (Object.prototype.hasOwnProperty.call(this.typeBySize, mode)) {
        const func = (this.typeBySize as any)[mode];
        const response = func(width);
        if (response) {
          this.mode = mode as MatDrawerMode;
        }
      }
    }
  }
  ngAfterViewInit(): void {
    // this.drawer.open();
    this.cd.detectChanges();
  }
}
