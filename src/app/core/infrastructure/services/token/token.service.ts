import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  token!: string;
  constructor() {}

  saveToken(token: string) {
    if (token) {
      this.token = token;
    }
  }
}
