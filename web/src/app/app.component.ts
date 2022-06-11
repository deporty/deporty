import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import {
  getCurrentGeolocation,
  trackEvent,
} from './core/helpers/log-events.helper';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { app } from './init-app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'sports-tournament';
  user!: any;
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

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.mode = 'over';
  }
  ngOnInit(): void {
    getAuth(app).onAuthStateChanged((i) => {
      this.user = i;
    });

    this.checkScreenWidth();
    window.onresize = (event: any) => {
      this.checkScreenWidth();
    };
  }
  closeSession() {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      this.drawer.close();

      this.router.navigate([AuthRoutingModule.route]);
    });
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
