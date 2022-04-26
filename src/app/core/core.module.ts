import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './infrastructure/services/token/token.service';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { UploadFileComponent } from './presentation/components/upload-file/upload-file.component';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [CommonModule],
  exports: [UploadFileComponent],
  providers: [TokenService, IsLoggedInGuard],
})
export class CoreModule {}
