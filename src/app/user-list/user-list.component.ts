import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page: number = 1;
  loading: boolean = false;
  searchValue: number = 0;
  searchSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.fetchUsers(this.page);
    this.searchSubscription = this.searchService.searchValue$.subscribe(
      (value: number) => {
        this.searchValue = value;
        this.searchUserById();
      }
    );
  }

  fetchUsers(page: number) {
    console.log('111111', this.users);
    this.loading = true;
    this.userService.getUsers(page).subscribe(
      (response: any) => {
        this.users = response.data;
        this.page = page;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  searchUserById(): void {
    if (this.searchValue) {
      this.loading = true;
      this.userService.getUser(this.searchValue).subscribe(
        (response: any) => {
          this.users = response.data ? [response.data] : [];
          this.page = 1;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      // If search value is 0, fetch all users
      this.fetchUsers(this.page);
    }
  }

  navigateToUserDetail(userId: number) {
    this.router.navigateByUrl(`/users/${userId}`);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
