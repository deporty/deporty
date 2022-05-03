import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponentsModule } from './components/components.module';

const COMPONENTS = [NewsDetailComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, NewsComponentsModule],
  imports: [CommonModule, NewsComponentsModule],
})
export class NewsModule {}
