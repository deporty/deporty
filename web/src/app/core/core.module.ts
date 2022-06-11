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
import { BreadcrumbComponent } from './presentation/components/breadcrumb/breadcrumb.component';
import { IsAllowedDirective } from './directives/is-allowed.directive';
import { DirectivesModule } from './directives/directives.module';
import { LoggedInContainerComponent } from './presentation/components/logged-in-container/logged-in-container.component';

@NgModule({
  declarations: [UploadFileComponent, TimestampPipe, BreadcrumbComponent, LoggedInContainerComponent],
  imports: [CommonModule, MatButtonModule, NewsModule, DirectivesModule],
  exports: [
    UploadFileComponent,
    NewsModule,
    TimestampPipe,
    BreadcrumbComponent,
    DirectivesModule
  ],
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
