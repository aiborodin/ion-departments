import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";

export class Department {
  id: number;
  name: string;
  type: string;
  employeesQuantity: number;

  constructor(id: number, name: string, type: string, employeesQuantity: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.employeesQuantity = employeesQuantity;
  }
}

export class Employee {
  id: number;
  name: string;
  age: number;
  gender: string;
  depId: number;

  constructor(id: number, name: string, age: number, depId: number) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.depId = depId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataGetterService {

  private departments: Department[] = [
    {
      id: 1,
      name: 'Software Development',
      type: 'Local',
      employeesQuantity: 12
    },
    {
      id: 2,
      name: 'Sales',
      type: 'Mixed',
      employeesQuantity: 10
    },
    {
      id: 3,
      name: 'Finance',
      type: 'Remote',
      employeesQuantity: 4
    },
  ];
  private employees: Employee[] = [
    {id: 1, name: 'Vasil Ivanov ', age: 22, gender: 'm', depId: 1},
    {id: 2, name: 'Petro Dmitrenko ', age: 43, gender: 'm', depId: 1},
    {id: 3, name: 'Katerina Smirnova', age: 21, gender: 'w', depId: 1},
    {id: 4, name: 'Don Diablo', age: 66, gender: 'm', depId: 2},
    {id: 5, name: 'Mike Tyson', age: 33, gender: 'm', depId: 2},
    {id: 6, name: 'John Butter', age: 28, gender: 'm', depId: 3},
    {id: 7, name: 'Lidia Maxwell', age: 34, gender: 'w', depId: 3},
  ];

  private userName = '';
  private users = ['Vasil', 'Petro', 'Olena'];

  // private employeeDataSubject = new Subject<string>();

  constructor() { }

  getDepartments(): Observable<any[]> {
    return of(this.departments);
  }
  getDepartment(id: number): Department {
    return this.departments.find((dep, idx) => {
      if (dep.id === id) {
        return this.departments[idx];
      }
    });
  }
  addDepartment(department: any): void {
    this.departments.push(department);
  }
  deleteDepartment(index: number): void {
    this.departments.splice(index, 1);
  }
  getEmployees(depId: number): Observable<any[]> {
    return of(this.employees.filter(e => e.depId === depId));
  }
  getUser(): string {
    return this.userName;
  }
  setUser(name: string) {
    this.userName = name;
  }
  userExists(name: string): boolean {
    return this.users.indexOf(name) !== -1;
  }
  // getEmployeeDataSubject(): Subject<string> {
  //   return this.employeeDataSubject;
  // }
}
