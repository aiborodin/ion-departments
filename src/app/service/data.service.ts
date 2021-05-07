import { Injectable } from '@angular/core';
import {Observable, of, pipe, Subject} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AuthService} from "./auth.service";

export interface Department {
  id: number;
  name: string;
  type: string;
}

export interface Employee {
  id: number;
  name: string;
  age: number;
  gender: string;
  department_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public readonly baseVersioned = 'http://ionic-api.loc/v1/';

  private access_token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    authService.user.subscribe(user => {
      this.access_token = user.access_token;
      console.log("In Data Service", user);
    });
  }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseVersioned}departments?access-token=${this.access_token}`);
  }
  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.baseVersioned}departments?access-token=${this.access_token}`, department);
  }
  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(this.baseVersioned + 'departments/' + department.id + '?access-token=' + this.access_token, department);
  }
  deleteDepartment(id: number): Observable<Department> {
    return this.http.delete<Department>(this.baseVersioned + 'departments/' + id + '?access-token=' + this.access_token);
  }
  getEmployees(depId: number, page: number = 1): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseVersioned}employees?filter[department_id]=${depId}&access-token=${this.access_token}&page=${page}`);
  }
  getEmployeesResponse(depId: number, page: number = 1): Observable<HttpResponse<Employee[]>> {
    return this.http.get<Employee[]>(`${this.baseVersioned}employees?filter[department_id]=${depId}&access-token=${this.access_token}&page=${page}`,
      { observe: 'response' });
  }
  getEmployeesQuantity(depId: number): number {
    let quantity = 0;
    this.http.get<number>(`${this.baseVersioned}employee/count?dep_id=${depId}&access-token=${this.access_token}`)
      .subscribe(response => quantity = +response);
    return quantity;
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseVersioned}employees?access-token=${this.access_token}`, employee);
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseVersioned + 'employees/' + employee.id + '?access-token=' + this.access_token, employee);
  }
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.baseVersioned + 'employees/' + id + '?access-token=' + this.access_token);
  }
}
