import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, //Added in Angular 17; no modules; must import this for routing.
    NgxPaginationModule,
  ],
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'empPortal';
}
