import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersRoutingModule } from './players-routing.module';
import { PagesModule } from './presentation/pages/pages.module';

@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, PagesModule, PlayersRoutingModule],
  exports: [PagesModule],
})
export class PlayersModule {}
