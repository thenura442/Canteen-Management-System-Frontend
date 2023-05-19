import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/_interfaces/employee';

const URL = 'https://cms-backend-d9n7.onrender.com/';
const PATH = 'api/employee/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  postEmployeeForm(Employee_Form : Employee) {
    return this.http.post<any>(URL+PATH+'register', Employee_Form)
  }

  updateEmployee(Employee_Form : Employee) {
    return this.http.post<any>(URL+PATH+'update/id', Employee_Form)
  }

  getEmployeeId(Employee_Id : any) {
    return this.http.post<any>(URL+PATH+'get/id', Employee_Id)
  }

  deleteEmployee(Employee_Id : any) {
    return this.http.post<any>(URL+PATH+'delete/id', Employee_Id)
  }
}
