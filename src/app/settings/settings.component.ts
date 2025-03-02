
import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule
  ],
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {

  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Load saved language from localStorage or default to English
    this.translate.use(localStorage.getItem('lang') || 'en');
  }

  toggleDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  }

// Apply saved theme on component load
  ngOnInit() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }


  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}
