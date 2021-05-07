import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.page.html',
  styleUrls: ['./http-test.page.scss'],
})
export class HttpTestPage implements OnInit {

  public posts: any[];

  private postCount = 0;
  private postStep = 10;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.refreshData(false);
  }

  refreshData(refresher: any) {
    this.posts = [];
    this.postCount = 0;
    this.addData(refresher);
  }

  addData(refresher: any) {
    this.http.get('https://jsonplaceholder.typicode.com/posts/')
      .pipe(map(
        (res: Array<any>) => res.filter(
          post => this.postCount < post.id && post.id <= this.postCount + this.postStep
        )
      ))
      .subscribe(
        posts => {
          this.posts = this.posts.concat(posts);
          this.postCount += this.postStep;
          if (refresher) {
            refresher.target.complete();
          }
        }
      );
  }
}
