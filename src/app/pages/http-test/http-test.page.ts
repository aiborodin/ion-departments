import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.page.html',
  styleUrls: ['./http-test.page.scss'],
})
export class HttpTestPage implements OnInit {

  public posts: any[];

  private postCount = 0;
  private postStep = 10;

  testSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    let testObs = this.testSubject.pipe(filter(val => val));
    this.methodWithPipe(testObs).subscribe(console.log);
    testObs.subscribe(val => console.log('Sub 1 -> ' + val));
    testObs.subscribe(val => console.log('Sub 2 -> ' + val));
    this.testSubject.next(3);
    testObs.subscribe(val => console.log('Sub 3 -> ' + val));
  }

  methodWithPipe(testObs: Observable<any>): Observable<any> {
    return testObs.pipe(map(value => value*value));
  }

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
