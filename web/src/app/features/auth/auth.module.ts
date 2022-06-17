import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './presentation/pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { LoginUserUsecase } from './domain/usecases/login-user/login-user.usecase';
import { AuthenticationService } from './infrastructure/services/authentication/authentication.service';
import { AuthenticationRepository } from './domain/repository/authentication.repository';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule } from 'src/app/core/core.module';
import { IsUserLoggedInUsecase } from './domain/usecases/is-user-logged-in/is-user-logged-in.usecase';
import { CreateResourceComponent } from './presentation/pages/create-resource/create-resource.component';
import { PagesModule } from './presentation/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CoreModule, CommonModule, AuthRoutingModule, PagesModule],
  providers: [
    LoginUserUsecase,
    IsUserLoggedInUsecase,
    { provide: AuthenticationRepository, useClass: AuthenticationService },
  ],
  exports: [RouterModule],
})
export class AuthModule {}
