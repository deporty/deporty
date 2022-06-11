import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { PagesModule } from './presentation/pages/pages.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    PagesModule,
  ]
})
export class TeamsModule { }
