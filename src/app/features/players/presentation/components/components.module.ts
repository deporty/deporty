import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from './player-card/player-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';

const COMPONENTS = [PlayerCardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatBadgeModule],
})
export class ComponentsModule {}
