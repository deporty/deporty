import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './infrastructure/services/token/token.service';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { UploadFileComponent } from './presentation/components/upload-file/upload-file.component';
import { NewsModule } from './presentation/components/news/news.module';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [CommonModule, NewsModule],
  exports: [UploadFileComponent, NewsModule],
  providers: [TokenService, IsLoggedInGuard],
})
export class CoreModule {}
