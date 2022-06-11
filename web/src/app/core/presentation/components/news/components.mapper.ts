import { AdComponent } from './components/ad/ad.component';
import { AudioComponent } from './components/audio/audio.component';
import { ColComponent } from './components/col/col.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsComponent } from './components/news/news.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { RowComponent } from './components/row/row.component';
import { VideoComponent } from './components/video/video.component';

export const COMPONENTS_MAPPER = {
  'app-header': HeaderComponent,
  'app-paragraph': ParagraphComponent,
  'app-ad': AdComponent,
  'app-news': NewsComponent,
  'app-col': ColComponent,
  'app-row': RowComponent,
  'app-audio': AudioComponent,
  'app-video': VideoComponent,
};
