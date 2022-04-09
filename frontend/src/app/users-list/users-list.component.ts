import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: User[] = [];
  currentUser: User = {};
  currentIndex = -1;
  username = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveUsers(): void {
    const params = this.getRequestParams(this.username, this.page, this.pageSize);

    this.userService.getAll(params)
    .subscribe(
      response => {
        const { users, totalItems } = response;
        this.users = users;
        this.count = totalItems;
        console.log(response);
        console.log(users);
        console.log(params)
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: any, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => { console.log(error); });
  }

  searchName(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findByName(this.username)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => { console.log(error); });
  }

}