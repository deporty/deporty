import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  token: string;
  constructor() {
    this.token = '';
  }

  saveToken(token: string) {
    if (token) {
      this.token = token;
      console.log("El token es valido", this.token)
    }
  }
  isTokenValid() {
    console.log(this.token);
    return this.token != null && this.token != undefined && this.token != '';
  }
}
