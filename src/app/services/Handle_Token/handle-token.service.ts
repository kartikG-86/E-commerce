import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleTokenService {

  constructor() { }

  getToken(): string {
    return (sessionStorage as any).getItem('token');
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    
    return token !== null;
  }
}
