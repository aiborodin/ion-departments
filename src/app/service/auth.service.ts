import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Storage } from '@ionic/storage-angular';

export interface User {
  id: number;
  username: string;
  email: string;
  access_token: string;
  role: Role;
}

export enum Role {
  VIEWER = "Viewer",
  EDITOR = "Editor",
  ADMIN = "Admin"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly baseUrl = 'http://ionic-api.loc/';

  public readonly STORAGE_TOKEN_KEY = 'user-token';

  public user: Observable<User>;
  private userSubject = new Subject<User>();

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.user = this.userSubject.asObservable();
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  login(user: any): Observable<User> {
    this.http.post<User>(this.baseUrl + 'login', user).subscribe(user => {
      this.userSubject.next(user);
      this.storage.set(this.STORAGE_TOKEN_KEY, {
        username: user.username,
        role: user.role
      });
    }, error => {
      this.userSubject.error(error);
    });
    return this.user;
  }
}
