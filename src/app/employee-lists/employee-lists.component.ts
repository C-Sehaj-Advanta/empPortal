import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js'; // Import ChartType
import { Employee } from '../employee-charts/employee.model'; // Make sure this import is correct

@Component({
  selector: 'app-employee-lists',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective],
  templateUrl: './employee-lists.component.html',
  styleUrls: ['./employee-lists.component.css'],
})
export class EmployeeChartsComponent implements OnInit {
  private httpClient = inject(HttpClient);

  loading = false;
  error: string | null = null;

  // Bar Chart Properties
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2, // increments of 2 on y-axis
          precision: 0, // no decimals
        },
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Number of Employees',
        data: [],
        backgroundColor: '#42A5F5', // A single color for the bar chart
      },
    ],
  };

  // Pie Chart Properties
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw + ' employees'; // Display count
            }
            return label;
          },
        },
      },
    },
  };

  pieChartData: ChartData<'pie'> = {
    labels: [], // e.g., ['Software Developer', 'UI/UX Designer', 'HR', 'Sales']
    datasets: [
      {
        data: [], // e.g., [6, 6, 6, 6]
        backgroundColor: [
          '#FF6384', // Red (Software Developer)
          '#36A2EB', // Blue (UI/UX Designer)
          '#FFCE56', // Yellow (HR)
          '#4BC0C0', // Teal (Sales)
        ],
      },
    ],
  };

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.error = null;

    this.httpClient
      .get<Employee[]>('http://localhost:3000/employees')
      .subscribe({
        next: (employees: Employee[]) => {
          // Process data for Bar Chart
          const ageGroups = this.groupByAgeRanges(employees);
          const barLabels = Object.keys(ageGroups);
          this.barChartData.labels = barLabels;
          this.barChartData.datasets[0].data = barLabels.map(
            (label) => ageGroups[label]
          );

          // Process data for Pie Chart
          const professionCounts = this.groupByProfessions(employees);
          const pieLabels = Object.keys(professionCounts);
          this.pieChartData.labels = pieLabels;
          this.pieChartData.datasets[0].data = pieLabels.map(
            (label) => professionCounts[label]
          );

          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch data:', err);
          this.error = 'Failed to fetch data. Please try again later.';
          this.loading = false;
        },
      });
  }

  private groupByAgeRanges(employees: Employee[]): { [range: string]: number } {
    const ranges: { [key: string]: number } = {
      '19-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51-60': 0,
      '61-70': 0,
    };

    if (!Array.isArray(employees)) {
      console.warn(
        'Expected employees to be an array for age grouping, but received:',
        employees
      );
      return ranges;
    }

    employees.forEach((emp) => {
      const age = emp.employee_age;
      if (age >= 19 && age <= 30) ranges['19-30']++;
      else if (age >= 31 && age <= 40) ranges['31-40']++;
      else if (age >= 41 && age <= 50) ranges['41-50']++;
      else if (age >= 51 && age <= 60) ranges['51-60']++;
      else if (age >= 61 && age <= 70) ranges['61-70']++;
    });

    return ranges;
  }

  // New method to group employees by profession
  private groupByProfessions(employees: Employee[]): {
    [profession: string]: number;
  } {
    const counts: { [profession: string]: number } = {};

    if (!Array.isArray(employees)) {
      console.warn(
        'Expected employees to be an array for profession grouping, but received:',
        employees
      );
      return counts;
    }

    employees.forEach((emp) => {
      const profession = emp.profession;
      if (profession) {
        // Ensure profession exists
        counts[profession] = (counts[profession] || 0) + 1;
      }
    });
    return counts;
  }
}
