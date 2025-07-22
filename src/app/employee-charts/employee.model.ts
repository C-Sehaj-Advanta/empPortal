export interface Employee {
  id?: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profession?: string;
  [key: string]: any;
}

export interface EmployeeWithProfession extends Employee {}
