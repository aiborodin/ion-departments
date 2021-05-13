import {Component, OnInit} from '@angular/core';
import {DataService, Department} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService, User, Role} from "../../services/auth.service";
import {FireDataService} from "../../services/fire-data.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  departments: Department[];
  showNew: boolean = false;
  showEdit: number = -1;
  extraData: string;
  user: User;
  Role = Role

  constructor(
    private dataService: DataService,
    private fireDataService: FireDataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => this.extraData = params.data);
    this.authService.user.subscribe(user => this.user = user);
  }
  ngOnInit() {
    this.fireDataService.departments.subscribe(departments => this.departments = departments);
  }
  delete(id: number) {
    this.dataService.deleteDepartment(id).subscribe(
      response => {
        console.log('Deleted department with id: ' + id);
        this.dataService.getDepartments().subscribe(departments => this.departments = departments);
      }
    );
  }
  addDepartment(department: Department) {
    this.dataService.addDepartment(department).subscribe(
      department => {
        console.log('Added department');
        console.log(department);
        this.dataService.getDepartments().subscribe(departments => this.departments = departments);
      }
    );
    this.showNew = false;
  }
  transferToDataSender() {
    this.router.navigate(['data-sender', {data: this.extraData}]);
  }
  logOut() {
    this.authService.signOut();
  }
}
