
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  private userCache: { [id: number]: User } = {};

  getUser(id: number): User | undefined {
    return this.userCache[id];
  }

  cacheUser(user: User): void {
    this.userCache[user.id] = user;
  }
}