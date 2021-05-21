import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Department, Employee} from "./data.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FireDataService {

  private departmentsCollection: AngularFirestoreCollection<Department>;
  departments: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.departmentsCollection = afs.collection<Department>('departments');
    this.departments = this.departmentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Department;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  updateDepartment(department: Department) {
    return this.afs
      .doc('departments/' + department.id)
      .update({
        name: department.name,
        type: department.type
      });
  }

  addDepartment(department: Department) {
    return this.afs
      .collection('departments')
      .add({
        name: department.name,
        type: department.type
      });
  }

  deleteDepartment(id) {
    return this.afs
      .doc('departments/' + id)
      .delete();
  }

  getEmployees(id: string): Observable<Employee[]> {
    return this.afs.doc<Department>('departments/' + id)
      .collection<Employee>('employees')
      .valueChanges();
  }
}
