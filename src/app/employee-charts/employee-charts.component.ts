import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model.js';
import { Router } from '@angular/router';
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
    MatButtonModule
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

  totalItems = 50;
  pageSize = 10;
  currentPage = 0;

  searchQuery = '';
  filterAge: number | null = null;

  sortColumn: string = '';
  sortDirection: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
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
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
  
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

  editEmployee(data: Employee): void {
    this.router.navigate([`/employee-list/${data.id}/edit`]);
  }
}
