import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

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

  private userName = '';

  private users = ['Vasil', 'Petro', 'Olena'];

  constructor() { }

  getDepartments(): Observable<any[]> {
    return of(this.departments);
  }
  addDepartment(department: any): void {
    this.departments.push(department);
  }
  deleteDepartment(index: number): void {
    this.departments.splice(index, 1);
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
}
