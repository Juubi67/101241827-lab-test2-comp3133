import { Component, OnInit } from '@angular/core';
import { SpaceXLaunch } from '../model/space-x-launch.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor],
  templateUrl: './missionfilter.component.html',
  styleUrl: './missionfilter.component.css',
})
export class MissionfilterComponent implements OnInit {
  launches: SpaceXLaunch[] = [];
  filteredLaunches: SpaceXLaunch[] = [];
  selectedYear: string = '';
  launchSuccess: boolean | null = null;
  landSuccess: boolean | null = null;
  years: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchLaunches();
    this.initYears();
  }

  initYears(): void {
    // Assuming you want to filter launches from 2006 to the current year
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }

  onSelectMission(flightNumber: number): void {
    this.router.navigate(['/missiondetails', flightNumber]);
  }

  fetchLaunches(): void {
    let apiUrl = 'https://api.spacexdata.com/v3/launches';
    let queryParams = '';
    if (this.selectedYear) {
      queryParams += `&launch_year=${this.selectedYear}`;
    }
    if (this.launchSuccess !== null) {
      queryParams += `&launch_success=${this.launchSuccess}`;
    }
    if (this.landSuccess !== null) {
      queryParams += `&land_success=${this.landSuccess}`;
    }
    if (queryParams) {
      apiUrl += `?${queryParams.slice(1)}`;
    }
    this.http.get<SpaceXLaunch[]>(apiUrl).subscribe(
      (data: SpaceXLaunch[]) => {
        this.launches = data;
        this.filteredLaunches = data;
      },
      (error) => {
        console.error('Error fetching launches:', error);
      }
    );
  }

  filterByYear(year: string): void {
    this.selectedYear = year;
    this.fetchLaunches();
  }

  filterByLaunchSuccess(success: boolean | null): void {
    this.launchSuccess = success;
    this.fetchLaunches();
  }

  filterByLandSuccess(success: boolean | null): void {
    this.landSuccess = success;
    this.fetchLaunches();
  }

  resetFilter(): void {
    this.selectedYear = '';
    this.launchSuccess = null;
    this.landSuccess = null;
    this.fetchLaunches();
  }
}
