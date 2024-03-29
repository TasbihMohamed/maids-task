import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number) {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get(url);
  }

  getUser(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }
}