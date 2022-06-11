import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { UsecasesModule } from '../../usecases/usecases.module';

const COMPONENTS = [BannerComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, UsecasesModule],
})
export class ComponentsModule {}
