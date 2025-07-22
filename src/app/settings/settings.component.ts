import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common'; // Required for common directives and async pipe
import { ThemeService } from '../services/themes.service'; // Adjust path based on your project structure
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(public themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/employee-lists']);
  }
}
