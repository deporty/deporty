import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './infrastructure/services/token/token.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [TokenService],
})
export class CoreModule {}
