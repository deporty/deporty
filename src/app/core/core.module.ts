import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './infrastructure/services/token/token.service';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { UploadFileComponent } from './presentation/components/upload-file/upload-file.component';
import { NewsModule } from './presentation/components/news/news.module';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in/is-not-logged-in.guard';
import { TimestampPipe } from './pipes/timestamp/timestamp.pipe';

@NgModule({
  declarations: [UploadFileComponent, TimestampPipe],
  imports: [CommonModule, NewsModule],
  exports: [UploadFileComponent, NewsModule, TimestampPipe],
  providers: [TokenService, IsLoggedInGuard, IsNotLoggedInGuard],
})
export class CoreModule {}
