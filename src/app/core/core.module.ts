import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './infrastructure/services/token/token.service';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [TokenService, IsLoggedInGuard],
})
export class CoreModule {}
