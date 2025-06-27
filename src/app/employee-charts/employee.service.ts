import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Employee } from './employee.model.js';

export interface EmployeeWithProfession extends Employee {
  profession?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';
  storageKey = 'employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeWithProfession[]> {
    const localEmployees = localStorage.getItem(this.storageKey);
    if (localEmployees) {
      return of(JSON.parse(localEmployees) as EmployeeWithProfession[]);
    }

    return this.http.get<{ status: string; data: Employee[] }>(this.apiUrl).pipe(
      map((res) => res.data.map((employee) => this.transformEmployee(employee))),
      map((employees) => {
        localStorage.setItem(this.storageKey, JSON.stringify(employees));
        return employees;
      }),
      catchError(this.handleError)
    );
  }

  getNextEmployeeId(): number {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return employees.length > 0
      ? Math.max(...employees.map((e: EmployeeWithProfession) => e.id)) + 1
      : 1;
  }

  getEmployeeById(id: number): EmployeeWithProfession | undefined {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return employees.find((employee: EmployeeWithProfession) => employee.id === id);
  }

  addEmployee(employee: EmployeeWithProfession): void {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    employees.push(employee);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  private transformEmployee(employee: Employee): EmployeeWithProfession {
    // Since API has only these fields, map them directly, 
    // add empty strings for missing fields (profession)
    return {
      id: employee.id,
      employee_name: employee.employee_name,
      employee_salary: employee.employee_salary,
      employee_age: employee.employee_age,
      profession: '',
    } as EmployeeWithProfession;
  }

  updateEmployee(updatedEmployee: EmployeeWithProfession) {
    const employees = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const index = employees.findIndex((employee: EmployeeWithProfession) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      localStorage.setItem(this.storageKey, JSON.stringify(employees));
    }
  }

  private handleError(error: any): Observable<EmployeeWithProfession[]> {
    console.error(`Error: ${error.message}`);
    return of([] as EmployeeWithProfession[]);
  }
}
