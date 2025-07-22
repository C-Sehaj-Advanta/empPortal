// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, map } from 'rxjs';
// import { Employee } from './employee.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class EmployeeService {
//   private baseUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
//   }

//   getEmployee(id: number): Observable<Employee | undefined> {
//     return this.getEmployees().pipe(
//       map((employees) => employees.find((emp) => emp.id === id))
//     );
//   }

//   createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
//     // POST to /employees to create
//     return this.http.post<Employee>(`${this.baseUrl}/employees`, employee);
//   }

//   updateEmployee(
//     id: number,
//     employeeData: Partial<Employee>
//   ): Observable<Employee> {
//     // PUT to /employees/:id to update
//     return this.http.put<Employee>(
//       `${this.baseUrl}/employees/${id}`,
//       employeeData
//     );
//   }

//   deleteEmployee(id: number): Observable<void> {
//     // DELETE to /employees/:id to delete
//     return this.http.delete<void>(`${this.baseUrl}/employees/${id}`);
//   }
// }

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of, throwError } from 'rxjs'; // Added HttpErrorResponse, catchError, of, throwError
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  // --- MODIFIED METHOD ---
  getEmployee(id: number): Observable<Employee | undefined> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // If the server responds with a 404 (Not Found),
        // we return an Observable of undefined.
        // For other errors, we re-throw them.
        if (error.status === 404) {
          console.warn(`Employee with ID ${id} not found on the server.`);
          return of(undefined);
        }
        // Re-throw other types of errors to be handled by the component's error block
        return throwError(() => new Error(`Error fetching employee: ${error.message}`));
      })
    );
  }

  createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employees`, employee);
  }

  updateEmployee(
    id: number,
    employeeData: Partial<Employee>
  ): Observable<Employee> {
    // PUT to /employees/:id to update
    return this.http.put<Employee>(
      `${this.baseUrl}/employees/${id}`,
      employeeData
    );
  }

  deleteEmployee(id: number): Observable<void> {
    // DELETE to /employees/:id to delete
    return this.http.delete<void>(`${this.baseUrl}/employees/${id}`);
  }
}