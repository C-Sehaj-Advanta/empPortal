import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterLink, MatTooltipModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
