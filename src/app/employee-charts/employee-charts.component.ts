// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatButtonModule} from '@angular/material/button';
//
// @Component({
//   selector: 'app-employee-charts',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, FormsModule, MatPaginatorModule, MatTooltipModule, MatButtonModule],
//   templateUrl: './employee-charts.component.html',
//   styleUrls: ['./employee-charts.component.css']
// })
// export class EmployeeListsComponent implements OnInit {
//   httpClient = inject(HttpClient);
//
//   data: any[] = []; // Original data fetched from API
//   filteredData: any[] = []; // Filtered data for display
//   loading = false;
//   error: string | null = null;
//
//   // Pagination settings
//   totalItems = 50; // Total 50 users
//   pageSize = 10;   // 10 users per page
//   currentPage = 0; // Page index starts from 0
//
//   // Search and filter fields
//   searchQuery = '';
//   filterAge: number | null = null;
//
//   // Sorting state
//   sortColumn: string = '';
//   sortDirection: boolean = true; // true for ascending, false for descending
//
//   ngOnInit(): void {
//     this.fetchData();
//   }
//
//   fetchData() {
//     this.loading = true;
//     this.error = null;
//
//     this.httpClient.get('https://hub.dummyapis.com/employee?noofRecords=50&idStarts=1001')
//       .subscribe({
//         next: (data: any) => {
//           this.data = data;
//           this.filteredData = data.slice(0, this.pageSize); // Initialize filtered data with the first 10 items
//           this.loading = false;
//         },
//         error: () => {
//           this.error = 'Failed to fetch data. Please try again later.';
//           this.loading = false;
//         }
//       });
//   }
//
//   applyFilters() {
//     const query = this.searchQuery.toLowerCase();
//     this.filteredData = this.data.filter(employee => {
//       const matchesSearch = employee.firstName.toLowerCase().includes(query) ||
//         employee.lastName.toLowerCase().includes(query) ||
//         employee.email.toLowerCase().includes(query);
//       const matchesAge = this.filterAge ? employee.age === this.filterAge : true;
//       return matchesSearch && matchesAge;
//     });
//     this.sortData();
//   }
//
//   sortData() {
//     if (this.sortColumn) {
//       this.filteredData.sort((a, b) => {
//         const aValue = a[this.sortColumn];
//         const bValue = b[this.sortColumn];
//
//         let comparison = 0;
//         if (typeof aValue === 'string' && typeof bValue === 'string') {
//           comparison = aValue.localeCompare(bValue);
//         } else if (typeof aValue === 'number' && typeof bValue === 'number') {
//           comparison = aValue - bValue;
//         }
//
//         return this.sortDirection ? comparison : -comparison;
//       });
//     }
//   }
//
//   toggleSort(column: string) {
//     if (this.sortColumn === column) {
//       this.sortDirection = !this.sortDirection; // Toggle direction if the same column is clicked
//     } else {
//       this.sortColumn = column;
//       this.sortDirection = true; // Default to ascending
//     }
//     this.sortData();
//   }
//
//   // Pagination handling
//   pageChanged(event: PageEvent) {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.applyPagination();
//   }
//
//   applyPagination() {
//     const startIndex = this.currentPage * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     this.filteredData = this.data.slice(startIndex, endIndex);
//   }
// }

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employee-charts',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatPaginatorModule, MatTooltipModule, MatButtonModule],
  templateUrl: './employee-charts.component.html',
  styleUrls: ['./employee-charts.component.css']
})
export class EmployeeListsComponent implements OnInit {
  httpClient = inject(HttpClient);

  data: any[] = [];
  filteredData: any[] = [];
  loading = false;
  error: string | null = null;

  totalItems = 50;
  pageSize = 10;
  currentPage = 0;

  searchQuery = '';
  filterAge: number | null = null;

  sortColumn: string = '';
  sortDirection: boolean = true;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.error = null;

    this.httpClient.get('https://hub.dummyapis.com/employee?noofRecords=50&idStarts=1001')
      .subscribe({
        next: (data: any) => {
          this.data = data;
          this.filteredData = data.slice(0, this.pageSize);
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
    this.filteredData = this.data.filter(employee => {
      const matchesSearch = employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query);
      const matchesAge = this.filterAge ? employee.age === this.filterAge : true;
      return matchesSearch && matchesAge;
    });
    this.sortData();
  }

  sortData() {
    if (this.sortColumn) {
      this.filteredData.sort((a, b) => {
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
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredData = this.data.slice(startIndex, endIndex);
  }
}
