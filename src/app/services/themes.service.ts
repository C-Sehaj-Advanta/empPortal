import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly THEME_STORAGE_KEY = 'app-theme';

  private _isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme: Observable<boolean> = this._isDarkTheme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') {
      this.setTheme(true);
    } else if (savedTheme === 'light') {
      this.setTheme(false);
    } else {
      this.setTheme(prefersDark);
    }
  }

  setTheme(isDark: boolean): void {
    this._isDarkTheme.next(isDark);
    console.log('ThemeService: Setting theme to dark:', isDark);

    if (isDark) {
      this.renderer.addClass(document.body, this.DARK_THEME_CLASS);
      localStorage.setItem(this.THEME_STORAGE_KEY, 'dark');
    } else {
      this.renderer.removeClass(document.body, this.DARK_THEME_CLASS);
      localStorage.setItem(this.THEME_STORAGE_KEY, 'light');
    }
  }

  toggleTheme(): void {
    this.setTheme(!this._isDarkTheme.value);
  }
}