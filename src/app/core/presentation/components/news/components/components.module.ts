import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdDirective } from './ad.directive';
import { AdComponent } from './ad/ad.component';
import { AudioComponent } from './audio/audio.component';
import { ColComponent } from './col/col.component';
import { NewsComponent } from './news/news.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { RowComponent } from './row/row.component';
import { VideoComponent } from './video/video.component';

const COMPONENTS = [
  ParagraphComponent,
  AdDirective,
  AdComponent,
  NewsComponent,
  RowComponent,
  ColComponent,
  AudioComponent,
  VideoComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [...COMPONENTS],
})
export class NewsComponentsModule {}
