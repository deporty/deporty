import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  init,
  RESOURCES_PERMISSIONS,
  RESOURCES_PERMISSIONS_IT,
} from './init-app';
import { CoreModule } from './core/core.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AdsModule } from './features/ads/ads.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './app.reducer';
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
    AdsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => init,
      multi: true,
    },
    {
      provide: RESOURCES_PERMISSIONS_IT,
      useValue: RESOURCES_PERMISSIONS,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
