import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { ViewAllComponent } from './view-all/view-all.component';

const COMPONENTS = [CreatePlayerComponent, ViewAllComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, ComponentsModule],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
