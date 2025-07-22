import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model.js';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employee-charts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './employee-charts.component.html',
  styleUrls: ['./employee-charts.component.css']
})
export class EmployeeListsComponent implements OnInit {
  httpClient = inject(HttpClient);

  data: Employee[] = [];
  filteredData: Employee[] = [];
  filteredSortedData: Employee[] = [];

  loading = false;
  error: string | null = null;
  employees: Employee[] = [];

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  searchQuery = '';
  filterAge: number | null = null;

  sortColumn: string = '';
  sortDirection: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.error = null;
  
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.data = data;
        this.filteredSortedData = [...data]; // full filtered+sorted data
        this.totalItems = data.length;
        this.applyPagination();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch data. Please try again later.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    const query = this.searchQuery.toLowerCase();
    this.filteredSortedData = this.data.filter(employee => {
      const matchesSearch = employee.employee_name.toLowerCase().includes(query);
      const matchesAge = this.filterAge ? employee.employee_age === this.filterAge : true;
      return matchesSearch && matchesAge;
    });
    this.sortData();
    this.applyPagination();
  }

  sortData() {
    if (this.sortColumn) {
      this.filteredSortedData.sort((a, b) => {
        let aValue: any = (a as any)[this.sortColumn];
        let bValue: any = (b as any)[this.sortColumn]; 


        if (this.sortColumn === 'id' || this.sortColumn === 'employee_salary' || this.sortColumn === 'employee_age') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }
       
  
        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        }
  
        return this.sortDirection ? comparison : -comparison;
      });
    }
  }

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }
    this.sortData();
    this.applyPagination();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredData = this.filteredSortedData.slice(startIndex, endIndex);
  }

  editEmployee(id: number) {
    // Navigate to the edit page with the employee ID
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        alert('Employee deleted successfully');
        this.fetchData(); // refresh the list
      });
    }
  }

}