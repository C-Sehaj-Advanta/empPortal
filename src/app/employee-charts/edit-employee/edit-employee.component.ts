import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        if (!employee) {
          alert('Employee not found');
          this.router.navigate(['/employee-lists']);
          return;
        }
        this.employeeForm.patchValue({
          employee_name: employee.employee_name,
          employee_salary: employee.employee_salary.toString(),
          employee_age: employee.employee_age.toString(),
          profession: employee.profession ?? '', // add profession
        });
      },
      error: () => {
        alert('Employee not found');
        this.router.navigate(['/employee-lists']);
      },
    });
  }

  editEmployee() {
    if (this.employeeForm.invalid || this.employeeId === null) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const updatedEmployee: Employee = {
      id: this.employeeId,
      employee_name: this.employeeForm.value.employee_name!,
      employee_salary: Number(this.employeeForm.value.employee_salary),
      employee_age: Number(this.employeeForm.value.employee_age),
      profession: this.employeeForm.value.profession!,
    };

    this.employeeService
      .updateEmployee(this.employeeId, updatedEmployee)
      .subscribe({
        next: () => {
          alert('Employee updated successfully!');
          this.router.navigate(['/employee-lists']);
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('Failed to update employee.');
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/employee-lists']);
  }
}
