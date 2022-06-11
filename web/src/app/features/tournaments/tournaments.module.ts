import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { PagesModule } from './presentation/pages/pages.module';
import { UsecasesModule } from './usecases/usecases.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    PagesModule,
    UsecasesModule,
    InfrastructureModule
  ],
})
export class TournamentsModule {}
