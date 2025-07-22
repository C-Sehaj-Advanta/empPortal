import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm = new FormGroup({
    employee_name: new FormControl('', Validators.required),
    employee_salary: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    employee_age: new FormControl('', [Validators.required, Validators.min(0)]),
    profession: new FormControl('', Validators.required),
  });

  employeeId: number | null = null;
  professions: string[] = [
    'UI/UX Designer',
    'Software Developer',
    'HR',
    'Sales',
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addEmployee() {
    if (this.employeeForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const newEmployee: Omit<Employee, 'id'> = {
      employee_name: this.employeeForm.value.employee_name!,
      employee_salary: Number(this.employeeForm.value.employee_salary),
      employee_age: Number(this.employeeForm.value.employee_age),
      profession: this.employeeForm.value.profession!,
    };

    this.employeeService.createEmployee(newEmployee).subscribe({
      next: (response) => {
        alert('Employee added successfully!');
        console.log('New employee added:', response);
        this.router.navigate(['/employee-lists']);
      },
      error: (err) => {
        console.error('Failed to add employee:', err);
        alert('Failed to add employee. Please try again later.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/employee-lists']);
  }
}
