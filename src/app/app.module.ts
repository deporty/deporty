import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { init } from './init-app';
import { CoreModule } from './core/core.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => init,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
