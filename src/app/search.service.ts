import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchValueSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  searchValue$ = this.searchValueSubject.asObservable();

  setSearchValue(value: number) {
    this.searchValueSubject.next(value);
  }
}