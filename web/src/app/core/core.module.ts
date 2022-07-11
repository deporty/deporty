import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FileAdapter } from './adapters/file/file.adapter';
import { DirectivesModule } from './directives/directives.module';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in/is-not-logged-in.guard';
import { FileService } from './infrastructure/file/file.service';
import { TokenService } from './infrastructure/services/token/token.service';
import { TimestampPipe } from './pipes/timestamp/timestamp.pipe';
import { BreadcrumbComponent } from './presentation/components/breadcrumb/breadcrumb.component';
import { LoggedInContainerComponent } from './presentation/components/logged-in-container/logged-in-container.component';
import { UploadFileComponent } from './presentation/components/upload-file/upload-file.component';
import { UploadFileUsecase } from './usecases/upload-file/upload-file';
import { DefaultLoadingComponent } from './presentation/components/default-loading/default-loading.component';
import { CommingSoonComponent } from './presentation/components/comming-soon/comming-soon.component';

@NgModule({
  declarations: [
    UploadFileComponent,
    TimestampPipe,
    BreadcrumbComponent,
    LoggedInContainerComponent,
    DefaultLoadingComponent,
    CommingSoonComponent,
  ],
  imports: [CommonModule, MatButtonModule, DirectivesModule],
  exports: [
    UploadFileComponent,
    TimestampPipe,
    BreadcrumbComponent,
    DirectivesModule,
    DefaultLoadingComponent,
    CommingSoonComponent
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
