import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { PlayersSummaryListComponent } from './players-summary-list/players-summary-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';

const COMPONENTS = [CreatePlayerComponent, PlayersSummaryListComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, ComponentsModule],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
  ],
})
export class PagesModule {}
