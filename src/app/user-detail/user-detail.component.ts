
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  user: any;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.fetchUser(this.userId);
    });
  }

  fetchUser(userId: number) {
    this.loading = true;
    this.userService.getUser(userId).subscribe(
      (response: any) => {
        this.user = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this._location.back();
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../user.service';
// import { UserCacheService } from '../user-cache.service';
// import { User } from '../user.model';

// @Component({
//   selector: 'app-user-detail',
//   templateUrl: './user-detail.component.html',
//   styleUrls: ['./user-detail.component.scss'],
// })
// export class UserDetailComponent implements OnInit {
//   user: User | undefined;
//   loading: boolean = true;

//   constructor(
//     private route: ActivatedRoute,
//     private userService: UserService,
//     private userCacheService: UserCacheService
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));

//     this.user = this.userCacheService.getUser(id);

//     if (this.user) {
//       this.loading = false;
//     } else {
//       this.userService.getUser(id).subscribe(
//         (user: User) => {
//           this.user = user;
//           this.loading = false;
//           this.userCacheService.cacheUser(user);
//         },
//         (error) => {
//           console.log('Error fetching user details:', error);
//           this.loading = false;
//         }
//       );
//     }
//   }
// }