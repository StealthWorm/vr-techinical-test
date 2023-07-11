import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VR Software Frontend';

  selectedTabIndex: number;

  constructor(private router: Router) {
    this.selectedTabIndex = 0; // Set the default selected tab index
  }

  navigateTo(route: string, index: number) {
    this.selectedTabIndex = index;
    this.router.navigateByUrl(route);
  }
}
