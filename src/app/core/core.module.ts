import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './infrastructure/services/token/token.service';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { UploadFileComponent } from './presentation/components/upload-file/upload-file.component';
import { NewsModule } from './presentation/components/news/news.module';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in/is-not-logged-in.guard';
import { TimestampPipe } from './pipes/timestamp/timestamp.pipe';
import { MatButtonModule } from '@angular/material/button';
import { FileAdapter } from './adapters/file/file.adapter';
import { FileService } from './infrastructure/file/file.service';
import { UploadFileUsecase } from './usecases/upload-file/upload-file';

@NgModule({
  declarations: [UploadFileComponent, TimestampPipe],
  imports: [CommonModule, MatButtonModule, NewsModule],
  exports: [UploadFileComponent, NewsModule, TimestampPipe],
  providers: [
    TokenService,
    IsLoggedInGuard,
    IsNotLoggedInGuard,
    UploadFileUsecase,
    {
      provide: FileAdapter,
      useClass: FileService,
    },
  ],
})
export class CoreModule {}
