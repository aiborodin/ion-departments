import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Department, Employee} from "./data.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class FireDataService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    // this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  logIn(user) {
    return this.afAuth.signInWithEmailAndPassword(user.username, user.password);
  }

  getUser(): Observable<User> {
    return this.afAuth.authState;
  }

  getDepartments() {
    return this.afs.collection<Department>('departments').snapshotChanges().pipe(
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
